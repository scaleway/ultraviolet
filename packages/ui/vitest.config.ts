import { createVitestProjectsConfig } from '@utils/test/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export const vitestConfig = createVitestProjectsConfig({
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_${hash}`,
      // Enable unstable mode for better compatibility with Vitest
      unstable_mode: 'transform',
    }),
  ],
  unit: {
    name: 'uv/ui',
    testTimeout: 10_000,
    setupFiles: ['./vitest.setup.ts'],
  },
  browser: {
    name: 'uv/ui-browser',
    setupFiles: ['@utils/test/browser-setup'],
  },
})

export default vitestConfig
