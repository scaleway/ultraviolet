/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, devices } from '@playwright/test'

const isCI = process.env['CI']

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
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  reporter: 'line',
  retries: isCI ? 2 : 0,
  testDir: './tests',
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
  },
  workers: isCI ? 1 : undefined,
})
