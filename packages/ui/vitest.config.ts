import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig, mergeConfig } from 'vite'
import { defaultConfig } from '../../vite.config'

export default mergeConfig(defineConfig(defaultConfig), {
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_${hash}`,
      unstable_mode: 'transform',
    }),
  ], // Enable unstable mode for better compatibility with Vitest
  test: {
    environment: 'happy-dom',
    name: 'uv/ui happy-dom',
    setupFiles: ['./vitest.setup.ts'],
  },
})
