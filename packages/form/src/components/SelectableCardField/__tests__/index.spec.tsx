import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form, SelectableCardField } from '../..'
import {
  mockRandom,
  restoreRandom,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'

describe('SelectableCardField', () => {
  beforeAll(mockRandom)
  afterAll(restoreRandom)

  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectableCardField name="test" value="test">
        Radio field
      </SelectableCardField>,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectableCardField name="test" value="disabled" disabled>
        Radio field disabled
      </SelectableCardField>,
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
        <SelectableCardField name="test" value="checked">
          Radio field checked
        </SelectableCardField>
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
      <SelectableCardField
        name="test"
        value="events"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        Radio field events
      </SelectableCardField>,
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

  test('should render correctly with errors', () =>
    shouldMatchEmotionSnapshot(
      <Form onRawSubmit={() => {}} errors={mockErrors}>
        <SelectableCardField name="test" value="checked" required>
          Radio field error
        </SelectableCardField>
        <button type="submit">Submit</button>
      </Form>,
      {
        transform: async node => {
          await act(async () => {
            await userEvent.click(node.getByRole('button'))
          })
          const input = node.getByRole('radio', { hidden: true })
          expect(input).toHaveAttribute('aria-invalid', 'true')
        },
      },
    ))
})
