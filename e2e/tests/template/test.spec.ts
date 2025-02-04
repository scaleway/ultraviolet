import { test } from '@playwright/test'

test('[TEMPLATE EXAMPLE] click on button', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/template`)

  await page.getByRole('button', { name: 'Click me' }).click()
})
