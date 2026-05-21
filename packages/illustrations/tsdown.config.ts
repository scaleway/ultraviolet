import { defaultConfig } from '@repo/config/tsdown/tsdown.config.ts'
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin'
import { defineConfig, mergeConfig } from 'tsdown'

export default mergeConfig(
  defaultConfig,
  defineConfig({
    entry: 'src/**/*.ts',
    plugins: [
      vanillaExtractPlugin({
        identifiers: ({ hash }) => `uv_icons_${hash}`,
        // unstable_mode: 'transform' will generate a style scoped to the component
      }),
    ],
  }),
)
