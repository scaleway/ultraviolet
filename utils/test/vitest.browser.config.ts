import { playwright } from '@vitest/browser-playwright'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import type { TestUserConfig, ViteUserConfig } from 'vitest/config'

const defaultBrowserConfig = defineConfig({
  test: {
    tags: [
      {
        name: 'a11y',
        description: 'Tests written for accessility.',
      },
    ],
    // Accessibility tests runs in a real browser so axe can check rules
    // that need a layout engine, e.g. color-contrast.
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        {
          browser: 'chromium',
        },
      ],
    },
    include: ['src/**/__tests__/a11y.test.tsx'],
    exclude: [
      ...configDefaults.exclude,
      '**/node_modules/**',
      '**/{dist,build}/**',
      '**/__stories__/**',
      '**.stories.*',
    ],
    globals: true,
    testTimeout: 30_000,
  },
})

export const createBrowserVitestConfig = (options: TestUserConfig & ViteUserConfig = {}) =>
  mergeConfig(defaultBrowserConfig, options)

export default createBrowserVitestConfig()
