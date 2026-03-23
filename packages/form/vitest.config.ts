import { createVitestConfig } from '@utils/test/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export const vitestConfig = {
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_${hash}`,
      unstable_mode: 'transform',
    }),
  ],
  test: {
    ...createVitestConfig({
      environment: 'jsdom',
      name: 'form',
      dom: true,
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
