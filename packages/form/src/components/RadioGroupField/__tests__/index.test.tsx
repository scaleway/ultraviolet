import { act, screen } from '@testing-library/react'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { RadioGroupField } from '..'

describe('RadioField', () => {
  test('should render correctly checked', () => {
    const { asFragment } = renderWithForm(
      <RadioGroupField
        value="value-1"
        onChange={() => {}}
        name="radio"
        legend="Label"
      >
        <RadioGroupField.Radio value="value-1" label="Radio 1" />
        <RadioGroupField.Radio value="value-2" label="Radio 2" />
      </RadioGroupField>,
    )
    const [firstInput, secondInput] = screen.getAllByRole('radio', {
      hidden: true,
    })
    act(() => secondInput.click())

    expect(firstInput).not.toBeChecked()
    expect(secondInput).toBeChecked()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events correctly', () => {
    const onChange = vi.fn(() => {})

    const { asFragment } = renderWithForm(
      <RadioGroupField
        name="test"
        value="value-2"
        onChange={onChange}
        legend="RadioGroupField events"
      >
        <RadioGroupField.Radio value="value-1" label="Radio 1" />
        <RadioGroupField.Radio value="value-2" label="Radio 2" />
      </RadioGroupField>,
    )
    const input = screen.getAllByRole('radio', { hidden: true })[0]
    act(() => input.click())
    expect(onChange).toBeCalledTimes(1)
    expect(asFragment()).toMatchSnapshot()
  })
})
