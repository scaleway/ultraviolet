import { defaultConfig } from '@repo/config/tsdown/tsdown.config.ts'
import { defineConfig, mergeConfig } from 'tsdown'

export default mergeConfig(
  defaultConfig,
  defineConfig({
    entry: {
      index: 'src/index.ts',
      composition: 'src/composition.ts',
    },
  }),
)
