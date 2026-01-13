import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { RadioGroupField } from '..'

describe('radioField', () => {
  test('should render correctly checked', async () => {
    const { asFragment } = renderWithForm(
      <RadioGroupField
        legend="Label"
        name="radio"
        onChange={() => {}}
        value="value-1"
      >
        <RadioGroupField.Radio label="Radio 1" value="value-1" />
        <RadioGroupField.Radio label="Radio 2" value="value-2" />
      </RadioGroupField>,
    )
    const [firstInput, secondInput] = screen.getAllByRole('radio', {
      hidden: true,
    })
    await userEvent.click(secondInput)

    expect(firstInput).not.toBeChecked()
    expect(secondInput).toBeChecked()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events correctly', async () => {
    const onChange = vi.fn(() => {})

    const { asFragment } = renderWithForm(
      <RadioGroupField
        legend="RadioGroupField events"
        name="test"
        onChange={onChange}
        value="value-2"
      >
        <RadioGroupField.Radio label="Radio 1" value="value-1" />
        <RadioGroupField.Radio label="Radio 2" value="value-2" />
      </RadioGroupField>,
    )
    const input = screen.getAllByRole('radio', { hidden: true })[0]
    await userEvent.click(input)
    expect(onChange).toHaveBeenCalledOnce()
    expect(asFragment()).toMatchSnapshot()
  })
})
