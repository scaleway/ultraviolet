import { expect, test } from '@playwright/test'

test('open modal, fill text inputs, close modal', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/componentsWithinModal`)
  await page.getByRole('button', { name: 'Open Modal' }).click()
  await expect(page.locator('dialog')).toBeVisible()

  await page.getByLabel('First name').click()
  await page.getByLabel('First name').fill('Test First Name')

  await expect(page.locator('div[data-testid="input-value"]')).toHaveText('Test First Name')

  await page.getByLabel('Last name').click()
  await page.getByLabel('Last name').fill('Test Last Name')

  await expect(page.locator('div[data-testid="form-content"]')).toHaveText('Test Last Name')

  await page.getByRole('button', { name: 'close' }).click()
  await expect(page.locator('dialog')).not.toBeVisible()
})

test('open modal, select an option, open nested modal through select input, close modal', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/componentsWithinModal`)
  await page.getByRole('button', { name: 'Open Modal' }).click()
  await expect(page.locator('dialog')).toBeVisible()

  await page.getByRole('combobox', { name: 'Color' }).click()
  await page.getByRole('option', { name: 'Red' }).click()
  await page.getByRole('combobox', { name: 'Color' }).click()

  await page.getByRole('button', { name: 'Open Nested Modal' }).click()
  const nestedModal = page.locator('dialog').filter({ hasText: 'This is the nested modal' })
  await nestedModal.getByRole('button', { name: 'close' }).click()
  await expect(nestedModal).not.toBeAttached()

  await page.getByRole('combobox', { name: 'Color' }).click() // close the select input dropdown (it hides the modal's close button)

  await page.getByRole('button', { name: 'close' }).click()
  await expect(page.locator('dialog')).not.toBeVisible()
})

test('open modal, click on select input, check that it opens, click outside, check that select input closes and modal is still open', async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}/componentsWithinModal`)
  await page.getByRole('button', { name: 'Open Modal' }).click()
  await expect(page.locator('dialog')).toBeVisible()

  await page.getByRole('combobox', { name: 'Color' }).click()

  await page.getByRole('option', { name: 'Red' }).isVisible()
  await page.getByRole('option', { name: 'red' }).click()
  await page.getByLabel('First name').click()
  await page.getByRole('option', { name: 'Red' }).isHidden()
  await expect(page.locator('dialog')).toBeVisible()
})
