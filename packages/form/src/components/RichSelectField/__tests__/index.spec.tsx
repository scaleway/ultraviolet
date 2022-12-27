import { fireEvent } from '@testing-library/dom'
import { act } from '@testing-library/react'
import { RichSelectField } from '..'
import {
  mockRandom,
  restoreRandom,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'

describe('RichSelectField', () => {
  beforeAll(mockRandom)

  afterAll(restoreRandom)

  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RichSelectField name="test">
        <RichSelectField.Option value="value" label="Label" />
      </RichSelectField>,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RichSelectField name="test" disabled>
        <RichSelectField.Option value="value" label="Label" />
        <RichSelectField.Option value="value2" label="Label 2" />
      </RichSelectField>,
    ))

  test('should render correctly multiple', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RichSelectField name="test" multiple>
        <RichSelectField.Option value="value" label="Label" />
        <RichSelectField.Option value="value2" label="Label 2" />
      </RichSelectField>,
    ))

  test('should render correctly with a disabled option', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RichSelectField name="test">
        <RichSelectField.Option value="value" label="Label" />
        <RichSelectField.Option value="value2" label="Label 2" disabled />
      </RichSelectField>,
    ))

  test('should display right value on grouped options', () => {
    const selectedOption = { label: 'Group Label', value: 'Group Value' }
    const options = [
      {
        label: 'Group',
        options: [
          selectedOption,
          { label: 'Group Label 2', value: 'Group value2' },
        ],
      },
    ]

    return shouldMatchEmotionSnapshotFormWrapper(
      <RichSelectField name="test" options={options} />,
      {
        transform: async ({ getByRole, getByTestId, container }) => {
          const select = getByRole('combobox') as HTMLInputElement
          act(() => select.focus())
          await act(() =>
            fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 }),
          )
          const option = getByTestId(`option-test-${selectedOption.value}`)
            .firstChild as HTMLElement

          act(() => option.click())

          // react-select works with a hidden input to handle value.
          const hiddenSelectInput = container.querySelector(
            'input[type="hidden"]',
          ) as HTMLInputElement

          const { value } = hiddenSelectInput
          expect(value).toBe(selectedOption.value)
        },
      },
    )
  })

  test('should trigger events', () => {
    const onChange = jest.fn()

    return shouldMatchEmotionSnapshotFormWrapper(
      <RichSelectField
        name="test"
        options={[
          { label: 'Label', value: 'value' },
          { label: 'Label 2', value: 'value2' },
        ]}
        onChange={onChange}
      />,
      {
        transform: async node => {
          const select = node.getByRole('combobox')
          await act(() =>
            fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 }),
          )
          const option = node.getByTestId('option-test-value')
            .firstChild as HTMLElement

          act(() => option.click())
          expect(onChange).toBeCalledTimes(1)
          act(() => select.blur())
        },
      },
    )
  })
})
