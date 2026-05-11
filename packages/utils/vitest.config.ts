import { createVitestConfig } from '@utils/test/config'
import { mergeConfig } from 'vite'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  createVitestConfig({
    setupFiles: ['./vitest.setup.ts'],
  }),
)
