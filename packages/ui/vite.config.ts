import { defaultConfig } from '@repo/config/vite/vite.config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig, mergeConfig } from 'vite'

export const config = mergeConfig(defineConfig(defaultConfig), {
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        composition: 'src/composition.ts',
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
