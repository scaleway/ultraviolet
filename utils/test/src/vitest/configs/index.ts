import { defineConfig, mergeConfig } from 'vitest/config'
import type { TestUserConfig, ViteUserConfig } from 'vitest/config'
import { browserProjectConfig } from './browserProjectConfig.ts'
import { globalTestOptions } from './globalTestOptions.ts'
import { unitTestOptions } from './unitTestOptions.ts'

export const createVitestConfig = (options: TestUserConfig & ViteUserConfig = {}) =>
  mergeConfig(
    defineConfig({
      test: {
        ...globalTestOptions,
        ...unitTestOptions,
      },
    }),
    options,
  )

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
        mergeConfig({ test: unitTestOptions }, { ...viteOptions, test: unit }),
        mergeConfig(browserProjectConfig, { ...viteOptions, test: browser }),
      ],
    },
  })
}
