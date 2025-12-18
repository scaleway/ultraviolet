import { mergeConfig } from 'vite'
import { createVitestConfig } from '../../vitest.config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  createVitestConfig({
    setupFiles: ['./vitest.setup.ts'],
  }),
)
