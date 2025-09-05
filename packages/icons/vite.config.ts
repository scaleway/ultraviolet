import svgr from '@svgr/rollup'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { resolve } from 'path'
import { defineConfig, mergeConfig } from 'vite'
import { defaultConfig } from '../../vite.config'

export default mergeConfig(defineConfig(defaultConfig), {
  build: {
    lib: {
      entry: {
        '': resolve(__dirname, 'src/index.ts'),
        'components/CategoryIcon/index': resolve(
          __dirname,
          'src/components/CategoryIcon/index.ts',
        ),
        'components/Logo/index': resolve(
          __dirname,
          'src/components/Logo/index.ts',
        ),
        'components/ProductIcon/index': resolve(
          __dirname,
          'src/components/ProductIcon/index.ts',
        ),
      },
    },
  },
  plugins: [
    svgr({ memo: true, svgo: false }), // We disable svgo because we have custom configuration for it svgo.config.js
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_${hash}`,
      unstable_mode: 'transform',
    }),
  ],
})
