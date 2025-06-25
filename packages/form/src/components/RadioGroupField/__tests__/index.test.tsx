import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { RadioGroupField } from '..'

describe('RadioField', () => {
  test('should render correctly checked', async () => {
    const { asFragment } = renderWithForm(
      <RadioGroupField
        value="value-1"
        onChange={() => {}}
        name="radio"
        legend="Label"
      >
        <RadioGroupField.Radio name="value-1" value="value-1" label="Radio 1" />
        <RadioGroupField.Radio name="value-2" value="value-2" label="Radio 2" />
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
        name="test"
        value="value-2"
        onChange={onChange}
        legend="RadioGroupField events"
      >
        <RadioGroupField.Radio name="value-1" value="value-1" label="Radio 1" />
        <RadioGroupField.Radio name="value-2" value="value-2" label="Radio 2" />
      </RadioGroupField>,
    )
    const input = screen.getAllByRole('radio', { hidden: true })[0]
    await userEvent.click(input)
    expect(onChange).toBeCalledTimes(1)
    expect(asFragment()).toMatchSnapshot()
  })
})
