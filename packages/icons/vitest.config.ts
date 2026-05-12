import { createVitestConfig } from '@utils/test/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export const vitestConfig = createVitestConfig({
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_${hash}`,
      unstable_mode: 'transform',
    }),
  ],
  test: {
    name: 'uv/icons',
    setupFiles: ['./vitest.setup.ts'],
  },
})

export default vitestConfig
