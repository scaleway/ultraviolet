import { expect, test } from '@playwright/test'

test('UI components showcase screenshot', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/ui-components-showcase`)

  // Wait for all components to load
  await page.waitForLoadState('networkidle')

  // Take a full page screenshot
  await expect(page).toHaveScreenshot('ui-components-showcase-full.png', {
    fullPage: true,
    animations: 'disabled',
  })
})
