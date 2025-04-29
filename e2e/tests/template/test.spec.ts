import { test } from '@playwright/test'

// replace [Change me] by the name of your test
test('[Change me]', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/template`) // replace "template" by the folder name. Foldername should be camelCase.

  await page.getByRole('button', { name: 'Click me' }).click()
})
