import { resolve } from 'node:path'
import { defaultConfig } from '@repo/config/vite/vite.config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig, mergeConfig } from 'vite'

export const config = mergeConfig(defineConfig(defaultConfig), {
  build: {
    lib: {
      entry: {
        'components/CategoryIcon/index': resolve(
          import.meta.dirname,
          'src/components/CategoryIcon/index.ts',
        ),
        'components/Flags/index': resolve(
          import.meta.dirname,
          'src/components/Flags/index.ts',
        ),
        'components/Logo/index': resolve(
          import.meta.dirname,
          'src/components/Logo/index.ts',
        ),
        'components/ProductIcon/index': resolve(
          import.meta.dirname,
          'src/components/ProductIcon/index.ts',
        ),
        index: resolve(import.meta.dirname, 'src/index.ts'),
        iconStyles: resolve(import.meta.dirname, 'src/iconStyles.ts'),
      },
    },
  },
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_icons_${hash}`,
      unstable_mode: 'emitCss',
      // unstable_mode: 'transform' will generate a style scoped to the component
    }),
  ],
})

export default config
