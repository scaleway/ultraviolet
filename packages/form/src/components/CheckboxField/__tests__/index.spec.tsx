import { describe, expect, jest, test } from '@jest/globals'
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckboxField, Form } from '../..'
import {
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'

describe('CheckboxField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(<CheckboxField name="test" />))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <CheckboxField name="test" disabled />,
      {
        transform: () => {
          const input = screen.getByRole('checkbox', { hidden: true })
          expect(input).toBeDisabled()
        },
      },
    ))

  test('should render correctly checked without value', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <CheckboxField name="checked" />,
      {
        transform: () => {
          const input = screen.getByRole('checkbox', { hidden: true })
          expect(input).toBeChecked()
        },
      },
      {
        initialValues: {
          checked: true,
        },
      },
    ))

  test('should render correctly not checked without value', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <CheckboxField name="checked" />,
      {
        transform: () => {
          const input = screen.getByRole('checkbox', { hidden: true })
          expect(input).not.toBeChecked()
        },
      },
      {
        initialValues: {},
      },
    ))

  test('should trigger events correctly', () => {
    const onFocus = jest.fn(() => {})
    const onChange = jest.fn(() => {})
    const onBlur = jest.fn(() => {})

    return shouldMatchEmotionSnapshotFormWrapper(
      <CheckboxField
        name="test"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        Checkbox field events
      </CheckboxField>,
      {
        transform: () => {
          const input = screen.getByRole('checkbox', { hidden: true })
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
        <CheckboxField name="test" required>
          Checkbox field error
        </CheckboxField>
        <div>Focus</div>
      </Form>,
      {
        transform: async () => {
          await userEvent.click(screen.getByRole('checkbox', { hidden: true }))
          // to trigger error
          await userEvent.click(screen.getByRole('checkbox', { hidden: true }))
          await userEvent.click(screen.getByText('Focus'))
          const error = screen.getByText(mockErrors.required({ label: '' }))
          expect(error).toBeVisible()
        },
      },
    ))
})
