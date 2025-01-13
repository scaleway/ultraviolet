import { expect, test } from '@playwright/test'

test.describe('Default', () => {
  test('title', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}`)

    await expect(page).toHaveTitle('Get started - Docs ⋅ Storybook')
  })
})
