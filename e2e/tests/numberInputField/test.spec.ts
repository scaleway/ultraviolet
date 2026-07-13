import { expect, test } from '@playwright/test'

test.describe('NumberInputField', () => {
  ;['false', 'true'].forEach(registerMode => {
    test(`should handle special characters with registerMode=${registerMode}`, async ({ page, baseURL }) => {
      await page.goto(`${baseURL}/numberInputField?registerMode=${registerMode}`)

      const input = page.getByRole('spinbutton', { name: 'Test' })
      const submitButton = page.getByRole('button', { name: 'Submit' })

      await input.fill('1')
      await expect(page.getByText('"example": 1')).toBeVisible()
      await expect(page.getByText('"isValid": true')).toBeVisible()
      await expect(submitButton).toBeEnabled()

      await input.press('e')
      await expect(page.getByText('"example": "NaN"')).toBeVisible()
      await expect(page.getByText('"isValid": false')).toBeVisible()
      await expect(input).toHaveAccessibleDescription('This field should be a number')
      await expect(submitButton).toBeDisabled()

      await input.press('3')
      await expect(page.getByText('"example": 1000')).toBeVisible()
      await expect(page.getByText('"isValid": false')).toBeVisible()
      await expect(input).toHaveAccessibleDescription('This field is too high (maximum is : ...)')
      await expect(submitButton).toBeDisabled()

      await input.press('Backspace')
      await input.press('Backspace')
      await input.press('Backspace')
      await input.press('Backspace')

      await expect(page.getByText('"example": null')).toBeVisible()
      await expect(page.getByText('"isValid": true')).toBeVisible()
      await expect(submitButton).toBeEnabled()

      await input.press('5')
      await expect(page.getByText('"example": 5')).toBeVisible()
      await expect(page.getByText('"isValid": true')).toBeVisible()
      await expect(submitButton).toBeEnabled()

      await submitButton.click()
      await expect(page.getByText('"isSubmitSuccessful": true')).toBeVisible()
    })
  })
})
