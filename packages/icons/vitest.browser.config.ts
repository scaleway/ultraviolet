import { createBrowserVitestConfig } from '@utils/test/browser-config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export const vitestConfig = createBrowserVitestConfig({
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_${hash}`,
      unstable_mode: 'transform',
    }),
  ],
  test: {
    name: 'uv/icons',
    setupFiles: ['./vitest.browser.setup.ts'],
  },
})

export default vitestConfig
