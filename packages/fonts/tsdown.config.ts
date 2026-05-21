import { defaultConfig } from '@repo/config/tsdown/tsdown.config.ts'
import { defineConfig, mergeConfig } from 'tsdown'

export default mergeConfig(
  defaultConfig,
  defineConfig({
    dts: false,
    entry: 'src/fonts.ts',
    exports: {
      customExports: {
        '.': './dist/fonts.css',
      },
    },
    css: {
      splitting: false,
      fileName: 'fonts.css',
    },
    attw: false,
  }),
)
