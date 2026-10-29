import { defineConfig, mergeConfig } from 'vitest/config'
import type { TestUserConfig, ViteUserConfig } from 'vitest/config'
import { browserProjectConfig } from './browserProjectConfig.ts'
import { globalTestOptions } from './globalTestOptions.ts'
import { unitProjectConfig } from './unitProjectConfig.ts'
import { visualProjectConfig } from './visualProjectConfig.ts'

const defaultProject = {
  unit: {
    name: 'unit',
    testTimeout: 10_000,
    setupFiles: ['@utils/test/setup'],
  },
  browser: {
    name: 'browser',
    setupFiles: ['@utils/test/browser-setup'],
  },
  visual: {
    name: 'visual',
    setupFiles: ['@utils/test/browser-setup'],
  },
}

export const createVitestProjectsConfig = (
  options: ViteUserConfig & {
    unit?: TestUserConfig
    browser?: TestUserConfig
    visual?: TestUserConfig
  } = {},
) => {
  const { unit, browser, visual, ...viteOptions } = options

  return defineConfig({
    test: {
      ...globalTestOptions,
      projects: [
        mergeConfig(unitProjectConfig, { ...viteOptions, test: { ...defaultProject.unit, ...unit } }),
        mergeConfig(browserProjectConfig, { ...viteOptions, test: { ...defaultProject.browser, ...browser } }),
        mergeConfig(visualProjectConfig, { ...viteOptions, test: { ...defaultProject.visual, ...visual } }),
      ],
    },
  })
}
