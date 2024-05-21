import { act, screen } from '@testing-library/react'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { CheckboxGroupField } from '..'

describe('CheckboxField', () => {
  test('should render correctly checked', () => {
    const { asFragment } = renderWithForm(
      <CheckboxGroupField onChange={() => {}} name="Checkbox" legend="Label">
        <CheckboxGroupField.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroupField.Checkbox>
        <CheckboxGroupField.Checkbox name="value-2" value="value-2">
          Checkbox 2
        </CheckboxGroupField.Checkbox>
      </CheckboxGroupField>,
      {
        initialValues: {
          Checkbox: [],
        },
      },
    )
    const [firstInput, secondInput] = screen.getAllByRole<HTMLInputElement>(
      'checkbox',
      {
        hidden: true,
      },
    )
    act(() => secondInput.click())

    expect(firstInput).not.toBeChecked()
    expect(secondInput).toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events correctly with required prop', () => {
    const onChange = vi.fn(() => {})

    const { asFragment } = renderWithForm(
      <CheckboxGroupField
        name="test"
        onChange={onChange}
        legend="CheckboxGroupField events"
        required
      >
        <CheckboxGroupField.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroupField.Checkbox>
        <CheckboxGroupField.Checkbox name="value-2" value="value-2">
          Checkbox 2
        </CheckboxGroupField.Checkbox>
      </CheckboxGroupField>,
      {
        initialValues: {
          test: [],
        },
      },
    )
    const input = screen.getAllByRole('checkbox', { hidden: true })[0]
    act(() => input.click())
    expect(onChange).toBeCalledTimes(1)
    expect(input).toBeChecked()

    act(() => input.click())
    expect(onChange).toBeCalledTimes(2)
    expect(input).not.toBeChecked()

    expect(asFragment()).toMatchSnapshot()
  })
})
