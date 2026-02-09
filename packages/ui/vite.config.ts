import { resolve } from 'node:path'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig, mergeConfig } from 'vite'
import { defaultConfig } from '../../vite.config'

export default mergeConfig(defineConfig(defaultConfig), {
  build: {
    lib: {
      entry: {
        'components/compositions/Navigation/index': resolve(
          __dirname,
          'src/components/compositions/Navigation/index.tsx',
        ),
        'components/compositions/index': resolve(
          __dirname,
          'src/components/compositions/index.ts',
        ),
        index: 'src/index.ts',
      },
      rollupOptions: {
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
  test: {
    setupFiles: ['./vitest.setup.ts'],
  },
})
