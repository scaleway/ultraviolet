import {
  afterAll,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals'
import { act, screen } from '@testing-library/react'
import { RadioField } from '..'
import {
  mockRandom,
  restoreRandom,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

describe('RadioField', () => {
  beforeAll(() => {
    mockRandom()
  })
  afterAll(restoreRandom)

  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RadioField name="test" value="test" label="Radio field" />,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RadioField
        name="test"
        value="disabled"
        disabled
        label="Radio field disabled"
      />,
      {
        transform: () => {
          const input = screen.getByRole('radio', { hidden: true })
          expect(input).toBeDisabled()
        },
      },
    ))

  test('should render correctly checked', () =>
    shouldMatchEmotionSnapshot(
      <Form
        onRawSubmit={() => {}}
        errors={mockErrors}
        initialValues={{ test: 'checked' }}
      >
        <RadioField name="test" value="checked" label="Radio field checked" />
      </Form>,
      {
        transform: () => {
          const input = screen.getByRole('radio', { hidden: true })
          expect(input).toBeChecked()
        },
      },
    ))

  test('should trigger events correctly', () => {
    const onFocus = jest.fn(() => {})
    const onChange = jest.fn(() => {})
    const onBlur = jest.fn(() => {})

    return shouldMatchEmotionSnapshotFormWrapper(
      <RadioField
        name="test"
        value="events"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        label="Radio field events"
      />,
      {
        transform: () => {
          const input = screen.getByRole('radio', { hidden: true })
          act(() => input.focus())
          expect(onFocus).toBeCalledTimes(1)
          act(() => input.click())
          expect(onChange).toBeCalledTimes(1)
          act(() => input.blur())
          expect(onBlur).toBeCalledTimes(1)
        },
      },
    )
  })
})
