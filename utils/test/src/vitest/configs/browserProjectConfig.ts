import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import type { ViteUserConfig } from 'vitest/config'
import { browserProjectShared } from './browserShared.ts'

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
  optimizeDeps: browserProjectShared.optimizeDeps,
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
      provider: browserProjectShared.provider,
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
    exclude: browserProjectShared.exclude,
    testTimeout: 30_000,
    outputFile: {
      junit: '.reports/tests-browser.xml',
    },
  },
} satisfies ViteUserConfig
