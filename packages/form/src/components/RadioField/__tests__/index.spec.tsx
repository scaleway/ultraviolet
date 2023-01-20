import { act } from '@testing-library/react'
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
  beforeAll(mockRandom)
  afterAll(restoreRandom)

  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RadioField name="test" value="test">
        Radio field
      </RadioField>,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RadioField name="test" value="disabled" disabled>
        Radio field disabled
      </RadioField>,
      {
        transform: node => {
          const input = node.getByRole('radio', { hidden: true })
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
        <RadioField name="test" value="checked">
          Radio field checked
        </RadioField>
      </Form>,
      {
        transform: node => {
          const input = node.getByRole('radio', { hidden: true })
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
      >
        Radio field events
      </RadioField>,
      {
        transform: node => {
          const input = node.getByRole('radio', { hidden: true })
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
