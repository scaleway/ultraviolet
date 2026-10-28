import { createVitestProjectsConfig } from '@utils/test/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export const vitestConfig = createVitestProjectsConfig({
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_theme_${hash}`,
      unstable_mode: 'transform',
    }),
  ],
  test: {
    name: 'uv/themes',
    setupFiles: ['./vitest.setup.ts'],
  },
})

export default vitestConfig
