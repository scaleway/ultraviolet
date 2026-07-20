import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { playwright } from '@vitest/browser-playwright'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import type { TestUserConfig, ViteUserConfig } from 'vitest/config'

const defaultBrowserConfig = defineConfig({
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `uv_${hash}`,
      unstable_mode: 'transform',
    }),
  ],
  test: {
    name: 'browser-tests',
    testTimeout: 30_000,
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        {
          browser: 'chromium',
        },
      ],
    },
    include: ['src/**/__tests__/browser.test.tsx', 'src/**/__tests__/a11y.test.tsx'],
    exclude: [
      ...configDefaults.exclude,
      '**/node_modules/**',
      '**/{dist,build}/**',
      '**/__stories__/**',
      '**.stories.*',
      '**/coverages/**',
      '**/__stories__/**',
      '**/.{idea,git,cache,output,temp,reports,jest}/**',
    ],
    setupFiles: ['./vitest.browser.setup.ts'],
  },
})

export const createBrowserVitestConfig = (options: TestUserConfig & ViteUserConfig = {}) =>
  mergeConfig(defaultBrowserConfig, options)

export default createBrowserVitestConfig()
