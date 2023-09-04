import { describe, expect, jest, test } from '@jest/globals'
import { act, screen } from '@testing-library/react'
import { ToggleGroupField } from '..'
import { shouldMatchEmotionSnapshotFormWrapper } from '../../../../.jest/helpers'

describe('GroupField', () => {
  test('should render correctly checked', () =>
    shouldMatchEmotionSnapshotFormWrapper(
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
        transform: () => {
          const [firstInput, secondInput] = screen.getAllByRole('checkbox', {
            hidden: true,
          })
          act(() => secondInput.click())

          expect(firstInput).not.toBeChecked()
          expect(secondInput).toBeChecked()
        },
      },
    ))

  test('should trigger events correctly with required prop', () => {
    const onChange = jest.fn(() => {})

    return shouldMatchEmotionSnapshotFormWrapper(
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
        transform: () => {
          const input = screen.getAllByRole('checkbox', { hidden: true })[0]
          act(() => input.click())
          expect(onChange).toBeCalledTimes(1)
          expect(input).toBeChecked()

          act(() => input.click())
          expect(onChange).toBeCalledTimes(2)
          expect(input).not.toBeChecked()
        },
      },
    )
  })
})
