import { defineConfig, mergeConfig } from 'vitest/config'
import type { TestUserConfig, ViteUserConfig } from 'vitest/config'
import { browserProjectConfig } from './browserProjectConfig.ts'
import { globalTestOptions } from './globalTestOptions.ts'
import { unitProjectConfig } from './unitProjectConfig.ts'

export const createVitestProjectsConfig = (
  options: ViteUserConfig & {
    unit?: TestUserConfig
    browser?: TestUserConfig
  } = {},
) => {
  const { unit, browser, ...viteOptions } = options

  return defineConfig({
    test: {
      ...globalTestOptions,
      projects: [
        mergeConfig(unitProjectConfig, { ...viteOptions, test: unit }),
        mergeConfig(browserProjectConfig, { ...viteOptions, test: browser }),
      ],
    },
  })
}
