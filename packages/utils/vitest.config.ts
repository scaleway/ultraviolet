import { createVitestProjectsConfig } from '@utils/test/config'
import viteConfig from './vite.config'

export default createVitestProjectsConfig({
  plugins: [...viteConfig.plugins],
  unit: {
    name: 'unit',
    setupFiles: ['./vitest.setup.ts'],
  },
})
