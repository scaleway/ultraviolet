import { test } from '@playwright/test'

test('toggled component(s)', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/toggle`)

  await page.getByLabel('Checkbox', { exact: true }).check()
  await page.getByLabel('Toggle', { exact: true }).check()

  await page.getByLabel('CheckboxField', { exact: true }).check()
  await page.getByLabel('ToggleField', { exact: true }).check()
  await page.getByRole('button').click()
})
