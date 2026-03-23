import path, { extname, relative, resolve } from 'node:path'

import { defaultConfig } from '@repo/config/vite/vite.config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { globSync } from 'tinyglobby'
import { defineConfig, mergeConfig } from 'vite'

const input = Object.fromEntries(
  globSync('src/**/*.ts').map(file => [
    // This removes `src/` as well as the file extension from each
    // file, so e.g. src/nested/foo.js becomes nested/foo, and
    // normalizes Windows backslashes to forward slashes.

    relative('src', file.slice(0, file.length - extname(file).length))
      .split(path.sep)
      .join('/'),
    // This expands the relative paths to absolute paths, so e.g.
    // src/nested/foo.js becomes /project/src/nested/foo.js
    resolve(file),
  ]),
)

export const config = mergeConfig(defineConfig(defaultConfig), {
  build: {
    rolldownOptions: {
      input,
    },
  },
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_illustrations_${hash}`,
    }),
  ],
})

export default config
