import { resolve } from 'path'
import svgr from '@svgr/rollup'
import { defineConfig, mergeConfig } from 'vite'
import { defaultConfig } from '../../vite.config'

export default mergeConfig(defineConfig(defaultConfig), {
  plugins: [
    svgr({ memo: true, svgo: false }), // We disable svgo because we have custom configuration for it svgo.config.js
  ],
  build: {
    lib: {
      entry: {
        '': resolve(__dirname, 'src/index.ts'),
        'components/ProductIcon/index': resolve(
          __dirname,
          'src/components/ProductIcon/index.ts',
        ),
        'components/CategoryIcon/index': resolve(
          __dirname,
          'src/components/CategoryIcon/index.ts',
        ),
        'components/Logo/index': resolve(
          __dirname,
          'src/components/Logo/index.ts',
        ),
      },
    },
  },
})
