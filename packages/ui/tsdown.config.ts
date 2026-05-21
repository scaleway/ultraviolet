import { defaultConfig } from '@repo/config/tsdown/tsdown.config.ts'
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin'
import { defineConfig, mergeConfig } from 'tsdown'

export default mergeConfig(
  defaultConfig,
  defineConfig({
    entry: {
      'compositions/Navigation/index': 'src/compositions/Navigation/index.tsx',
      'compositions/EstimateCost/index': 'src/compositions/EstimateCost/index.tsx',
      composition: 'src/composition.ts',
      index: 'src/index.ts',
    },
    attw: {
      excludeEntrypoints: ['ui.css'],
    },
    outputOptions: {
      assetFileNames: 'ui.css',
    },
    loader: { '.svg': 'text' },
    plugins: [
      vanillaExtractPlugin({
        extract: {
          name: 'ui.css',
        },
        identifiers: ({ hash }) => `uv_${hash}`,
      }),
    ],
  }),
)
