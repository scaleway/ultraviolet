import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig, mergeConfig } from 'vite'
import { defaultConfig } from '../../vite.config'

export default mergeConfig(defineConfig(defaultConfig), {
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_illustrations_${hash}`,
    }),
  ],
  test: {
    setupFiles: ['./vitest.setup.ts'],
  },
})
