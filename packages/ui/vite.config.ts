import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig, mergeConfig } from 'vite'
import { defaultConfig } from '../../vite.config'

export default mergeConfig(defineConfig(defaultConfig), {
  test: {
    setupFiles: ['./vitest.setup.ts'],
  },
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `prefix_${hash}`,
    }),
  ],
})
