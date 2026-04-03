import { defaultConfig } from '@repo/config/vite/vite.config'
import { defineConfig, mergeConfig } from 'vite'

export const config = mergeConfig(defineConfig(defaultConfig), {
  build: {
    lib: {
      entry: {
        composition: 'src/composition.ts',
        index: 'src/index.ts',
      },
    },
  },
})

export default config
