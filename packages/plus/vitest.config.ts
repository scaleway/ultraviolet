import { createVitestConfig } from '@utils/test/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export const vitestConfig = {
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_plus_${hash}`,
      // Enable unstable mode for better compatibility with Vitest
      unstable_mode: 'transform',
    }),
  ],
  test: {
    ...createVitestConfig({
      environment: 'happy-dom',
      dom: true,
      name: 'uv/plus',
      setupFiles: ['./vitest.setup.ts'],
    }),
  },
}

export default vitestConfig
