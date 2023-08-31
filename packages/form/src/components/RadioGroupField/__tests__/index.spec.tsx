import { act, screen } from '@testing-library/react'
import { RadioGroupField } from '..'
import { shouldMatchEmotionSnapshotFormWrapper } from '../../../../.jest/helpers'

describe('RadioField', () => {
  test('should render correctly checked', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RadioGroupField
        value="value-1"
        onChange={() => {}}
        name="radio"
        legend="Label"
      >
        <RadioGroupField.Radio name="value-1" value="value-1" label="Radio 1" />
        <RadioGroupField.Radio name="value-2" value="value-2" label="Radio 2" />
      </RadioGroupField>,
      {
        transform: () => {
          const [firstInput, secondInput] = screen.getAllByRole('radio', {
            hidden: true,
          })
          act(() => secondInput.click())

          expect(firstInput).not.toBeChecked()
          expect(secondInput).toBeChecked()
        },
      },
    ))

  test('should trigger events correctly', () => {
    const onChange = jest.fn(() => {})

    return shouldMatchEmotionSnapshotFormWrapper(
      <RadioGroupField
        name="test"
        value="value-2"
        onChange={onChange}
        legend="RadioGroupField events"
      >
        <RadioGroupField.Radio name="value-1" value="value-1" label="Radio 1" />
        <RadioGroupField.Radio name="value-2" value="value-2" label="Radio 2" />
      </RadioGroupField>,
      {
        transform: () => {
          const input = screen.getAllByRole('radio', { hidden: true })[0]
          act(() => input.click())
          expect(onChange).toBeCalledTimes(1)
        },
      },
    )
  })
})
