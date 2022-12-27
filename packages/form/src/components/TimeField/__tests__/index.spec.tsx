import { fireEvent, waitFor } from '@testing-library/dom'
import { act } from '@testing-library/react'
import { TimeField } from '..'
import {
  mockRandom,
  restoreRandom,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'

describe('TimeField', () => {
  beforeAll(mockRandom)

  afterAll(restoreRandom)

  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(<TimeField name="test" />))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(<TimeField name="test" disabled />))

  test('should render correctly checked without value', () =>
    shouldMatchEmotionSnapshotFormWrapper(<TimeField name="test" />, {
      transform: async node => {
        const input = node.getByRole('combobox')
        await waitFor(() => expect(input).toHaveAttribute('value', ''))
      },
    }))

  test('should trigger events', () => {
    const onChange = jest.fn()

    return shouldMatchEmotionSnapshotFormWrapper(
      <TimeField
        name="test"
        onChange={onChange}
        options={[
          { label: '01:00', value: '01:00' },
          { label: '02:00', value: '02:00' },
        ]}
      />,
      {
        transform: async node => {
          const select = node.getByRole('combobox')
          act(() => select.focus())
          await act(() =>
            fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 }),
          )
          const option = node.getByTestId('option--01:00')
            .firstChild as HTMLElement
          act(() => option.click())
          expect(onChange).toBeCalledTimes(1)
          act(() => select.blur())
        },
      },
    )
  })
})
