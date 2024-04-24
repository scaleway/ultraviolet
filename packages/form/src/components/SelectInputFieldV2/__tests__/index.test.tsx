import {
  afterAll,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals'
import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SelectInputFieldV2 } from '..'
import {
  mockRandom,
  restoreRandom,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { cities, planets } from './resources'

describe('SelectInputField', () => {
  beforeAll(() => {
    mockRandom()
  })

  afterAll(restoreRandom)

  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectInputFieldV2 name="test" options={cities} />,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectInputFieldV2 name="test" options={cities} disabled />,
    ))

  test('should render correctly multiselect', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectInputFieldV2 name="test" options={cities} multiselect />,
    ))

  test('should render correctly grouped', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectInputFieldV2 name="test" options={planets} multiselect />,
    ))

  test('should display right value on grouped options', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectInputFieldV2 name="test" options={planets} searchable={false} />,
      {
        transform: () => {
          const select = screen.getByTestId('select-bar')
          act(() => select.click())
          fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 })
          const mercury = screen.getByTestId(`option-stack-mercury`)

          act(() => mercury.click())
          act(() => select.click())

          expect(mercury).toBeVisible()
        },
      },
    ))

  test('should trigger events', () => {
    const onChange = jest.fn()

    return shouldMatchEmotionSnapshotFormWrapper(
      <SelectInputFieldV2
        name="test"
        options={planets}
        searchable={false}
        onChange={onChange}
      />,

      {
        transform: async () => {
          const select = screen.getByTestId('select-bar')
          await userEvent.click(select)
          const option = screen.getByTestId('option-stack-mercury')

          await userEvent.click(option)
          expect(onChange).toBeCalledTimes(1)
          act(() => select.blur())
        },
      },
    )
  })
})
