FROM node:24.20.0-alpine@sha256:e67514e5d0f6c46656005e1b693b2ec9d52e80b641307de684d4a015ba7a4eaf AS base

# Adapted from the Hono documentation
# https://hono.dev/docs/getting-started/nodejs#dockerfile

FROM base AS builder
WORKDIR /app

RUN corepack enable pnpm
# We don't copy pnpm-lock.yaml because it makes the image 2x larger
COPY package.json pnpm-workspace.yaml ./
RUN pnpm install --prod --workspace-root

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY server.js ./
COPY ./storybook-static ./storybook-static

ENV HONO_PORT=80
EXPOSE $HONO_PORT/tcp

CMD ["node", "server.js"]
