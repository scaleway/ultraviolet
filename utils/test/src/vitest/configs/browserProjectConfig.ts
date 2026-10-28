import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { playwright } from '@vitest/browser-playwright'
import { configDefaults } from 'vitest/config'
import type { ViteUserConfig } from 'vitest/config'

/*
 * Playwright's bundled Firefox (before 1.65) resolves its app-data from the
 * real Firefox's ~/Library/Application Support/Firefox, which macOS 27
 * TCC-protects whenever Firefox is installed: every launch then dies with
 * "Could not find profile folder" (microsoft/playwright#42768). Redirecting
 * the app-data resolution to a temp dir sidesteps the protection. Drop this
 * once playwright >= 1.65 ships its self-contained Firefox build.
 */
if (process.platform === 'darwin' && !process.env['CFFIXED_USER_HOME']) {
  process.env['CFFIXED_USER_HOME'] = mkdtempSync(path.join(tmpdir(), 'ultraviolet-firefox-home-'))
}

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
      headless: true,
      enabled: true,
      provider: playwright({
        contextOptions: {
          locale: 'en-US',
          timezoneId: 'UTC',
          reducedMotion: 'reduce',
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
    outputFile: {
      junit: '.reports/tests-browser.xml',
    },
  },
} satisfies ViteUserConfig
