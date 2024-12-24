import { expect, test } from '@playwright/test'

const defaultLocator = 'iframe[title="storybook-preview-iframe"]'
const defaultURL = `/?path=/story/components-data-display-list--selectable`

test.describe('List', () => {
  test('Checkbox Row', async ({ page, baseURL }) => {
    const url = `${baseURL}${defaultURL}`

    await page.goto(url)

    const rootLocator = page.locator(defaultLocator).contentFrame()
    await rootLocator
      .getByRole('row', { name: 'select Venus 0.718AU 0.728AU' })
      .getByLabel('select')
      .check()

    const checkbox = rootLocator.locator(
      `input[type='checkbox'][name='list-select-checkbox'][value="venus"]`,
    )

    await expect(checkbox).toBeChecked({
      checked: true,
    })
  })
})
