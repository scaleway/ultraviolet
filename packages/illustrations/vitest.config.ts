import { createVitestConfig } from '@utils/test/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export const vitestConfig = createVitestConfig({
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_${hash}`,
      // Enable unstable mode for better compatibility with Vitest
      unstable_mode: 'transform',
    }),
  ],
  test: {
    name: 'uv/illustration',
    setupFiles: ['./vitest.setup.ts'],
  },
})

export default vitestConfig
