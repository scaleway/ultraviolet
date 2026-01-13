import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { ToggleGroupField } from '..'

describe('groupField', () => {
  test('should render correctly checked', async () => {
    const { asFragment } = renderWithForm(
      <ToggleGroupField legend="Label" name="Group" onChange={() => {}}>
        <ToggleGroupField.Toggle
          label="value 1"
          name="value-1"
          value="value-1"
        />
        <ToggleGroupField.Toggle
          label="value 1"
          name="value-2"
          value="value-2"
        />
      </ToggleGroupField>,
      {
        defaultValues: {
          Group: [],
        },
      },
    )
    const [firstInput, secondInput] = screen.getAllByRole('checkbox', {
      hidden: true,
    })
    await userEvent.click(secondInput)

    expect(firstInput).not.toBeChecked()
    expect(secondInput).toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events correctly with required prop', async () => {
    const onChange = vi.fn(() => {})

    const { asFragment } = renderWithForm(
      <ToggleGroupField
        legend="ToggleGroupField events"
        name="test"
        onChange={onChange}
        required
      >
        <ToggleGroupField.Toggle
          label="value 1"
          name="value-1"
          value="value-1"
        />
        <ToggleGroupField.Toggle
          label="value 1"
          name="value-2"
          value="value-2"
        />
      </ToggleGroupField>,
      {
        defaultValues: {
          test: [],
        },
      },
    )
    const input = screen.getAllByRole('checkbox', { hidden: true })[0]
    await userEvent.click(input)
    expect(onChange).toHaveBeenCalledOnce()
    expect(input).toBeChecked()

    await userEvent.click(input)
    expect(onChange).toBeCalledTimes(2)
    expect(input).not.toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })
})
