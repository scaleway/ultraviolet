import { expect, test } from '@playwright/test'

const defaultLocator = 'iframe[title="storybook-preview-iframe"]'

const defaultURL = `/?path=/story/components-data-entry-checkbox--playground`

test.describe('List', () => {
  test('Checkbox Row', async ({ page, baseURL }) => {
    const url = `${baseURL}${defaultURL}`

    await page.goto(url)

    const rootLocator = page.locator(defaultLocator).contentFrame()
    await rootLocator.getByRole('checkbox').click()

    const checkbox = rootLocator.locator(`input[type='checkbox']`)

    await expect(checkbox).toBeChecked({
      checked: true,
    })
  })
})
