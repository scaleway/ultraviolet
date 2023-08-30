import { act, screen } from '@testing-library/react'
import { CheckboxGroupField } from '..'
import { shouldMatchEmotionSnapshotFormWrapper } from '../../../../.jest/helpers'

describe('CheckboxField', () => {
  test('should render correctly checked', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <CheckboxGroupField onChange={() => {}} name="Checkbox" legend="Label">
        <CheckboxGroupField.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroupField.Checkbox>
        <CheckboxGroupField.Checkbox name="value-2" value="value-2">
          Checkbox 2
        </CheckboxGroupField.Checkbox>
      </CheckboxGroupField>,
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
