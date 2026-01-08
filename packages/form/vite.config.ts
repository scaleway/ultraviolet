import { resolve } from 'node:path'
import { defineConfig, mergeConfig } from 'vite'
import { defaultConfig } from '../../vite.config'

export default mergeConfig(defineConfig(defaultConfig), {
  build: {
    lib: {
      entry: {
        'components/compositions/index': resolve(
          __dirname,
          'src/components/compositions/index.ts',
        ),
        index: 'src/index.ts',
      },
    },
  },
  test: {
    setupFiles: ['./vitest.setup.ts'],
  },
})
