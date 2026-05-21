import { defaultConfig } from '@repo/config/tsdown/tsdown.config.ts'
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin'
import { defineConfig, mergeConfig } from 'tsdown'

export default mergeConfig(
  defaultConfig,
  defineConfig({
    css: {
      splitting: false,
      fileName: 'global.css',
    },
    attw: {
      excludeEntrypoints: ['global.css'],
    },
    plugins: [
      vanillaExtractPlugin({
        identifiers: ({ hash }) => `uv_theme_${hash}`,
      }),
    ],
  }),
)
