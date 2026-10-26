import { playwright } from '@vitest/browser-playwright'
import { configDefaults } from 'vitest/config'
import type { ViteUserConfig } from 'vitest/config'

// Wrapper packages that internally import @vanilla-extract/css must be
// excluded from the browser dep optimizer: their pre-bundled copies embed a
// second css instance whose fileScope is never set by the transform-mode
// plugin. @vanilla-extract/css itself must stay optimized (CJS interop for
// picocolors), and shares its fileScope chunk with the plugin injection.
export const browserProjectConfig = {
  optimizeDeps: {
    exclude: ['@vanilla-extract/recipes', '@vanilla-extract/sprinkles'],
    // The fileScope imports are injected by the plugin at transform time, so
    // the scanner cannot discover them upfront: bundle them at server start
    // instead of mid-run, which reloads the page and fails cold test runs.
    // Same for the coverage runtime, injected only when --coverage is passed.
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
    // Accessibility tests runs in a real browser so axe can check rules
    // that need a layout engine, e.g. color-contrast.
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
    include: ['src/**/__tests__/a11y.test.tsx', 'src/**/__tests__/browser-environment.test.tsx'],
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
