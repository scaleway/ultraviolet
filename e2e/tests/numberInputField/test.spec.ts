import { expect, test } from '@playwright/test'

test.describe('NumberInputField', () => {
  test('should handle special characters', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/numberInputField`)

    const input = page.getByRole('spinbutton', { name: 'Test' })
    const submitButton = page.getByRole('button', { name: 'Submit' })

    await input.fill('1')
    expect(page.getByText('"example": 1')).toBeVisible()
    expect(page.getByText('"isValid": true')).toBeVisible()
    expect(submitButton).toBeEnabled()

    await input.press('e')
    expect(page.getByText('"example": "NaN"')).toBeVisible()
    expect(page.getByText('"isValid": false')).toBeVisible()
    await expect(input).toHaveAccessibleDescription('This field should be a number')
    expect(submitButton).toBeDisabled()

    await input.press('3')
    expect(page.getByText('"example": 1000')).toBeVisible()
    expect(page.getByText('"isValid": false')).toBeVisible()
    await expect(input).toHaveAccessibleDescription('This field is too high (maximum is : ...)')
    expect(submitButton).toBeDisabled()

    await input.press('Backspace')
    await input.press('Backspace')
    await input.press('Backspace')

    expect(page.getByText('"example": null')).toBeVisible()
    expect(page.getByText('"isValid": true')).toBeVisible()
    expect(submitButton).toBeEnabled()

    await input.press('5')
    expect(page.getByText('"example": 5')).toBeVisible()
    expect(page.getByText('"isValid": true')).toBeVisible()
    expect(submitButton).toBeEnabled()
  })
})
