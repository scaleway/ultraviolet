import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { resolve } from 'path'
import { defineConfig, mergeConfig } from 'vite'
import { defaultConfig } from '../../vite.config'

export default mergeConfig(defineConfig(defaultConfig), {
  build: {
    lib: {
      entry: {
        'components/CategoryIcon/index': resolve(
          __dirname,
          'src/components/CategoryIcon/index.ts',
        ),
        'components/Flags/index': resolve(
          __dirname,
          'src/components/Flags/index.ts',
        ),
        'components/Logo/index': resolve(
          __dirname,
          'src/components/Logo/index.ts',
        ),
        'components/ProductIcon/index': resolve(
          __dirname,
          'src/components/ProductIcon/index.ts',
        ),
        index: resolve(__dirname, 'src/index.ts'),
      },
    },
  },
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_${hash}`,
      unstable_mode: 'transform',
    }),
  ],
})
