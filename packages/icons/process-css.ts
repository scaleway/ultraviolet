// TODO: maybe look how to process this with a vite-plugin instead of a post-build.

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from './package.json' with { type: 'json' }

const { log: logger } = console

if (!pkg.exports['./iconStyles'].default) {
  throw new Error('Missing css module export')
}

const localDirname = dirname(fileURLToPath(import.meta.url))

// read the generated CSS file
const cssPath = join(localDirname, './dist/icons.css')
const cssContent = readFileSync(cssPath, 'utf8')

// Read the styles entry file
const entryPath = join(localDirname, './dist/iconStyles.js')
let entryContent = readFileSync(entryPath, 'utf8')

// Replace the empty export with the actual CSS
const escapedCss = cssContent
  .replace(/\\/g, String.raw`\\`)
  .replace(/'/g, String.raw`\'`)
  .replace(/`/g, '\\`')
  .replace(/\${/g, '\\${')

if (escapedCss === '') {
  throw new Error('broken css export')
}

entryContent = entryContent.replace(
  'const iconStyles = "";',
  `const iconStyles = \`${escapedCss}\`;`,
)

logger('export css module', entryPath)
// Write the updated entry file
writeFileSync(entryPath, entryContent)
