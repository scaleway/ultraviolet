import { expect, test } from '@playwright/test'

test.describe('SelectableCard type checkbox', () => {
  test('with SelectInput children', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/selectableCardComplexChildren`)

    const option1Checkbox = page.getByRole('checkbox', {
      name: 'Optional option 1',
    })
    const option2Checkbox = page.getByRole('checkbox', {
      name: 'Optional option 2',
    })
    const option1Selection = page.getByRole('combobox', {
      name: 'Select a sub option checkbox',
    })

    // Check the first selectable card and verify that only this one is checked
    await option1Checkbox.click()
    await expect(option1Checkbox).toBeChecked()
    await expect(option2Checkbox).not.toBeChecked()

    // Click on the select input within first selectable card and verify that only this one is selected and checked
    await option1Selection.click()
    await page.getByTestId('option-option1').click()
    await expect(option1Selection).toHaveText('Sub option 1')
    await expect(option1Checkbox).toBeChecked()
    await expect(option2Checkbox).not.toBeChecked()

    // Uncheck first selectable card and check that select input still has the same value
    await option1Checkbox.click()
    await expect(option1Checkbox).not.toBeChecked()
    await expect(option2Checkbox).not.toBeChecked()
    await expect(option1Selection).toHaveText('Sub option 1')
  })

  test('with text children', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/selectableCardComplexChildren`)

    const option1Checkbox = page.getByRole('checkbox', {
      name: 'Optional option 1',
    })
    const option2Checkbox = page.getByRole('checkbox', {
      name: 'Optional option 2',
    })

    // We check the 2nd selectable card when the children is simple
    await option2Checkbox.click()
    await expect(option1Checkbox).not.toBeChecked()
    await expect(option2Checkbox).toBeChecked()

    // Reset to initial state
    await option2Checkbox.click()
    await expect(option2Checkbox).not.toBeChecked()
    await expect(option1Checkbox).not.toBeChecked()

    // We click on the children to verify it will check the checkbox on a simple children
    await page
      .getByText(
        'This option will cost you 2.99€ and provide you with a lot more of happiness checkbox',
      )
      .click()
    await expect(option2Checkbox).toBeChecked()
    await expect(option1Checkbox).not.toBeChecked()
  })
})

test.describe('SelectableCard type radio', () => {
  test('with SelectInput children', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/selectableCardComplexChildren`)

    const option1Radio = page.getByRole('radio', {
      name: 'Optional option 1',
    })
    const option2Radio = page.getByRole('radio', {
      name: 'Optional option 2',
    })
    const option1Selection = page.getByRole('combobox', {
      name: 'Select a sub option radio',
    })

    // Check the first selectable card and verify that only this one is checked
    await option1Radio.click()
    await expect(option1Radio).toBeChecked()
    await expect(option2Radio).not.toBeChecked()

    // Select second option to keep testing the first one
    await option2Radio.click()
    await expect(option1Radio).not.toBeChecked()
    await expect(option2Radio).toBeChecked()

    // Click on the select input within first selectable card and verify that selectable card is checked when clicked
    await option1Selection.click()
    await expect(option1Radio).toBeChecked()
    await expect(option2Radio).not.toBeChecked()
    await page.getByTestId('option-option1').click()
    await expect(option1Selection).toHaveText('Sub option 1')
    await expect(option1Radio).toBeChecked()
    await expect(option2Radio).not.toBeChecked()

    // Click on the second radio and check that the value of select input is unchanged
    await option2Radio.click()
    await expect(option1Radio).not.toBeChecked()
    await expect(option2Radio).toBeChecked()
    await expect(option1Selection).toHaveText('Sub option 1')
  })

  test('with text children', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/selectableCardComplexChildren`)

    const option1Checkbox = page.getByRole('radio', {
      name: 'Optional option 1',
    })
    const option2Checkbox = page.getByRole('radio', {
      name: 'Optional option 2',
    })

    // We check the 2nd selectable card when the children is simple
    await option2Checkbox.click()
    await expect(option1Checkbox).not.toBeChecked()
    await expect(option2Checkbox).toBeChecked()

    // Click on first radio to come back to initial step
    await option1Checkbox.click()
    await expect(option1Checkbox).toBeChecked()
    await expect(option2Checkbox).not.toBeChecked()

    // We click on the children to verify it will check the checkbox on a simple children
    await page
      .getByText(
        'This option will cost you 2.99€ and provide you with a lot more of happiness radio',
      )
      .click()
    await expect(option2Checkbox).toBeChecked()
    await expect(option1Checkbox).not.toBeChecked()
  })
})
