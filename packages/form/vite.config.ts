import { resolve } from 'node:path'
import { defaultConfig } from '@repo/config/vite/vite.config'
import { defineConfig, mergeConfig } from 'vite'

export const config = mergeConfig(defineConfig(defaultConfig), {
  build: {
    lib: {
      entry: {
        'components/compositions/index': resolve(
          import.meta.dirname,
          'src/components/compositions/index.ts',
        ),
        index: 'src/index.ts',
      },
    },
  },
})

export default config
