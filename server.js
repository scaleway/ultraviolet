// oxlint-disable node/no-process-env no-console node/callback-return unicorn/no-process-exit
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { createStorybookMcpHandler } from '@storybook/mcp'
import { Hono } from 'hono'
import { compress } from 'hono/compress'
import { etag } from 'hono/etag'
import { secureHeaders } from 'hono/secure-headers'

const app = new Hono()

app.use('*', secureHeaders())
app.use('*', compress())

// Etag static files. Skip /mcp: its GET response is a live SSE stream that
// etag() would buffer until the stream ends (never), stalling the connection.
app.use('*', async (ctx, next) => (new URL(ctx.req.url).pathname === '/mcp' ? next() : etag()(ctx, next)))

// Cache-Control: immutable for hashed assets, revalidation for the rest via ETag
app.use('/*', async (ctx, next) => {
  await next()

  if (ctx.req.method !== 'GET' || ctx.res.headers.has('Cache-Control')) {
    return
  }
  const isHashed = ctx.req.path.startsWith('/assets/')
  ctx.header('Cache-Control', isHashed ? 'public, max-age=2592000, immutable' : 'no-cache')
})

const storybookMcpHandler = await createStorybookMcpHandler()

// MCP API endpoint
app.all('/mcp', async ctx => storybookMcpHandler(ctx.req.raw))

// Serve Storybook static build
app.use('/*', serveStatic({ root: './storybook-static' }))

const server = serve(
  {
    fetch: app.fetch,
    port: Math.trunc(Number(process.env.HONO_PORT || '80')),
  },
  info => {
    console.log(`🚀 Server listening on http://localhost:${info.port}`)
  },
)

const shutdown = () => {
  server.close(err => {
    if (err) {
      console.error(err)
    }
    process.exit(err ? 1 : 0)
  })
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
