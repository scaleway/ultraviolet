import { test } from '@playwright/test'

test('[Change me]', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/[folderName])`)

  await page.getByRole('button', { name: 'Click me' }).click()
})
