import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { mergeConfig } from 'vite'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, {
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_${hash}`,
      unstable_mode: 'transform',
    }),
  ],
  test: {
    setupFiles: ['./vitest.setup.ts'],
  },
})
