import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { CheckboxGroupField } from '..'

describe('CheckboxField', () => {
  test('should render correctly checked', async () => {
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
        defaultValues: {
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
    await userEvent.click(secondInput)

    expect(firstInput).not.toBeChecked()
    expect(secondInput).toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events correctly with required prop', async () => {
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
        defaultValues: {
          test: [],
        },
      },
    )
    const input = screen.getAllByRole('checkbox', { hidden: true })[0]
    await userEvent.click(input)
    expect(onChange).toBeCalledTimes(1)
    expect(input).toBeChecked()

    await userEvent.click(input)
    expect(onChange).toBeCalledTimes(2)
    expect(input).not.toBeChecked()

    expect(asFragment()).toMatchSnapshot()
  })
})
