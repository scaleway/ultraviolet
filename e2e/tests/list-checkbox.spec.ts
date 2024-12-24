import { expect, test } from '@playwright/test'

const defaultLocator = 'iframe[title="storybook-preview-iframe"]'

test('checkbox list', async ({ page, baseURL }) => {
  const url = `${baseURL}/?path=/story/components-data-display-list--selectable`
  await page.goto(url)

  const rootLocator = page.locator(defaultLocator).contentFrame()

  await rootLocator
    .getByRole('row', { name: 'select Venus 0.718AU 0.728AU' })
    .getByLabel('select')
    .check()

  const checkbox = rootLocator.locator(
    `input[type='checkbox'][name='list-select-checkbox'][value="venus"]`,
  )
  await expect(checkbox).toBeChecked()
})
