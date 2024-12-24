import { expect, test } from '@playwright/test'

test('has title', async ({ page, baseURL }) => {
  const url = baseURL
  await page.goto(`${url}`)

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Get started - Docs ⋅ Storybook')
})
