import { createVitestConfig } from '@utils/test/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export const vitestConfig = {
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_${hash}`,
      // Enable unstable mode for better compatibility with Vitest
      unstable_mode: 'transform',
    }),
  ],
  test: {
    ...createVitestConfig({
      testTimeout: 10_000,
      dom: true,
      name: 'ui',
      setupFiles: ['./vitest.setup.ts'],
      deps: {
        optimizer: {
          web: {
            enabled: true,
            include: ['@nivo/*'],
          },
        },
      },
    }),
  },
}

export default vitestConfig
