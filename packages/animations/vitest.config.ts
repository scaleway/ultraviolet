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
    name: 'unit',
  },
})

export default vitestConfig
