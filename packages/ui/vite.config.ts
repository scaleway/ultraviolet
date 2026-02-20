import { resolve } from 'node:path'
import { defaultConfig } from '@repo/config/vite/vite.config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig, mergeConfig } from 'vite'

export const config = mergeConfig(defineConfig(defaultConfig), {
  build: {
    lib: {
      entry: {
        'components/compositions/Navigation/index': resolve(
          __dirname,
          'src/components/compositions/Navigation/index.tsx',
        ),
        'components/compositions/index': resolve(
          import.meta.dirname,
          'src/components/compositions/index.ts',
        ),
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
