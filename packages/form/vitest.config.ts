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
      environment: 'happy-dom',
      name: 'uv/form happy-dom',
      setupFiles: ['./vitest.setup.ts'],
    }),
  },
}

export default vitestConfig
