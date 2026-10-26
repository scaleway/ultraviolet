import { createVitestProjectsConfig } from '@utils/test/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export const vitestConfig = createVitestProjectsConfig({
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_${hash}`,
      unstable_mode: 'transform',
    }),
  ],
  unit: {
    name: 'uv/icons',
    setupFiles: ['./vitest.setup.ts'],
  },
  browser: {
    name: 'uv/icons-browser',
    setupFiles: ['@utils/test/browser-setup'],
  },
})

export default vitestConfig
