import { playwright } from '@vitest/browser-playwright'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import type { TestUserConfig, ViteUserConfig } from 'vitest/config'

const defaultBrowserConfig = defineConfig({
  // Wrapper packages that internally import @vanilla-extract/css must be
  // excluded from the browser dep optimizer: their pre-bundled copies embed a
  // second css instance whose fileScope is never set by the transform-mode
  // plugin. @vanilla-extract/css itself must stay optimized (CJS interop for
  // picocolors), and shares its fileScope chunk with the plugin injection.
  optimizeDeps: {
    exclude: ['@vanilla-extract/recipes', '@vanilla-extract/sprinkles'],
    // The fileScope imports are injected by the plugin at transform time, so
    // the scanner cannot discover them upfront: bundle them at server start
    // instead of mid-run, which reloads the page and fails cold test runs.
    include: ['@vanilla-extract/css', '@vanilla-extract/css/fileScope'],
  },
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
      provider: playwright({
        // Deterministic timezone and locale inside the browser, replacing the
        // `TZ=UTC LC_ALL=en_US.UTF-8` prefixes that used to live in the
        // package.json test:browser scripts. Both options are emulated by
        // playwright in every browser context (chromium, firefox).
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
      ],
    },
    include: [
      'src/**/__tests__/a11y.test.tsx',
      // Environment canary asserting the deterministic browser context
      // configured by the playwright provider above.
      'src/**/__tests__/browser-environment.test.tsx',
    ],
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
