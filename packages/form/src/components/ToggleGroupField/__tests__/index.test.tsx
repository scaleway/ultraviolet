import { act, screen } from '@testing-library/react'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { ToggleGroupField } from '..'

describe('GroupField', () => {
  test('should render correctly checked', () => {
    const { asFragment } = renderWithForm(
      <ToggleGroupField onChange={() => {}} name="Group" legend="Label">
        <ToggleGroupField.Toggle
          name="value-1"
          value="value-1"
          label="value 1"
        />
        <ToggleGroupField.Toggle
          name="value-2"
          value="value-2"
          label="value 1"
        />
      </ToggleGroupField>,
      {
        initialValues: {
          Group: [],
        },
      },
    )
    const [firstInput, secondInput] = screen.getAllByRole('checkbox', {
      hidden: true,
    })
    act(() => secondInput.click())

    expect(firstInput).not.toBeChecked()
    expect(secondInput).toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events correctly with required prop', () => {
    const onChange = vi.fn(() => {})

    const { asFragment } = renderWithForm(
      <ToggleGroupField
        name="test"
        onChange={onChange}
        legend="ToggleGroupField events"
        required
      >
        <ToggleGroupField.Toggle
          name="value-1"
          value="value-1"
          label="value 1"
        />
        <ToggleGroupField.Toggle
          name="value-2"
          value="value-2"
          label="value 1"
        />
      </ToggleGroupField>,
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
