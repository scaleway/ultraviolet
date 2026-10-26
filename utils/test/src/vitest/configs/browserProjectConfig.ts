import { playwright } from '@vitest/browser-playwright'
import { configDefaults } from 'vitest/config'
import type { ViteUserConfig } from 'vitest/config'

export const browserProjectConfig = {
  optimizeDeps: {
    exclude: ['@vanilla-extract/recipes', '@vanilla-extract/sprinkles'],
    include: ['@vanilla-extract/css', '@vanilla-extract/css/fileScope', '@vitest/coverage-istanbul'],
  },
  test: {
    tags: [
      {
        name: 'a11y',
        description: 'Tests written for accessility.',
      },
    ],
    globals: true,
    browser: {
      // Headless everywhere, including local runs: override with
      // `--browser.headless=false` to open a visible browser window.
      headless: true,
      enabled: true,
      provider: playwright({
        contextOptions: {
          locale: 'en-US',
          timezoneId: 'UTC',
        },
      }),
      instances: [
        {
          browser: 'chromium',
        },
        {
          browser: 'firefox',
        },
        {
          browser: 'webkit',
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
    testTimeout: 30_000,
  },
} satisfies ViteUserConfig
