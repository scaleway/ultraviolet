import {
  afterAll,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals'
import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { TimeField } from '..'
import {
  mockRandom,
  restoreRandom,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'

describe('TimeField', () => {
  beforeAll(() => {
    mockRandom()
  })

  afterAll(restoreRandom)

  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(<TimeField name="test" />))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(<TimeField name="test" disabled />))

  test('should render correctly checked without value', () =>
    shouldMatchEmotionSnapshotFormWrapper(<TimeField name="test" />, {
      transform: async () => {
        const input = screen.getByRole('combobox')
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
        transform: () => {
          const select = screen.getByRole('combobox')
          act(() => select.focus())
          fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 })
          const option =
            // eslint-disable-next-line testing-library/no-node-access
            screen.getByTestId('option-test-01:00').firstChild as HTMLElement
          act(() => option.click())
          expect(onChange).toBeCalledTimes(1)
          act(() => select.blur())
        },
      },
    )
  })
})
