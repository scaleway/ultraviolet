import { resolve } from 'node:path'
import { defaultConfig } from '@repo/config/vite/vite.config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig, mergeConfig } from 'vite'

export const config = mergeConfig(defineConfig(defaultConfig), {
  build: {
    lib: {
      entry: {
        'compositions/Filters/index': resolve(import.meta.dirname, 'src/compositions/Filters/index.ts'),
        'compositions/index': 'src/compositions/index.ts',
        'compositions/styles': 'src/compositions/styles.ts',
        index: 'src/index.ts',
      },
      rolldownOptions: {
        output: {
          assetFileNames: 'ui.css',
        },
      },
    },
  },
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_${hash}`,
    }),
  ],
})

export default config
