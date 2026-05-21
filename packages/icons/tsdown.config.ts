import { defaultConfig } from '@repo/config/tsdown/tsdown.config.ts'
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin'
import { defineConfig, mergeConfig } from 'tsdown'

export default mergeConfig(
  defaultConfig,
  defineConfig({
    entry: {
      'components/CategoryIcon/index': 'src/components/CategoryIcon/index.ts',
      'components/Flags/index': 'src/components/Flags/index.ts',
      'components/Logo/index': 'src/components/Logo/index.ts',
      'components/ProductIcon/index': 'src/components/ProductIcon/index.ts',
      index: 'src/index.ts',
      iconStyles: 'src/iconStyles.ts',
    },
    plugins: [
      vanillaExtractPlugin({
        identifiers: ({ hash }) => `uv_icons_${hash}`,
        // unstable_mode: 'transform' will generate a style scoped to the component
      }),
    ],
  }),
)
