import { resolve } from 'node:path'
import { defaultConfig } from '@repo/config/vite/vite.config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig, mergeConfig } from 'vite'

export const config = mergeConfig(defineConfig(defaultConfig), {
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        'v2/index': resolve(import.meta.dirname, 'src/v2/index.ts'),
      },
    },
  },
  plugins: [vanillaExtractPlugin({ identifiers: ({ hash }) => `uv_theme_${hash}` })],
})

export default config
