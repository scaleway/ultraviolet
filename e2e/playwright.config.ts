/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, devices } from '@playwright/test'

const isCI = process.env.CI

const baseURL = 'http://localhost:5173'

const times = {
  '1min': 60 * 1000,
  '3min': 3 * 60 * 1000,
}

export default defineConfig({
  forbidOnly: !!isCI,
  fullyParallel: true,
  globalTimeout: isCI ? 5 * times['1min'] : undefined,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'e2e-chromium',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'e2e-firefox',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'e2e-webkit',
      testDir: './tests/e2e',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'screenshots-chromium',
      testDir: './tests/screenshots',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  reporter: 'line',
  retries: isCI ? 2 : 0,
  timeout: isCI ? Number(times['1min']) : undefined,
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    // it will start web app before running tests so you don't need to start it manually
    command: 'pnpm run start',
    stderr: 'pipe',
    stdout: 'ignore',
    url: baseURL,
    reuseExistingServer: true,
  },
  workers: isCI ? 1 : undefined,
})
