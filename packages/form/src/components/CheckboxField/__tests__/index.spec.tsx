import { waitFor } from '@testing-library/dom'
import { act } from '@testing-library/react'
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
        transform: node => {
          const input = node.getByRole('checkbox', { hidden: true })
          expect(input).toBeDisabled()
        },
      },
    ))

  test('should render correctly checked without value', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <CheckboxField name="checked" />,
      {
        transform: async node => {
          const input = node.getByRole('checkbox', { hidden: true })
          await waitFor(() => expect(input).toBeChecked())
        },
      },
      {
        initialValues: {
          checked: true,
        },
      },
    ))

  test('should render correctly with a value', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <>
        <CheckboxField name="value" value="foo" />
        <CheckboxField name="value" value="bar" />
      </>,
      {
        transform: node => {
          const inputChecked = node.getByRole('checkbox', {
            checked: true,
            hidden: true,
          })
          expect(inputChecked).toBeDefined()
          const inputNotChecked = node.getByRole('checkbox', {
            checked: false,
            hidden: true,
          })
          expect(inputNotChecked).toBeDefined()
        },
      },
      {
        initialValues: {
          value: ['bar'],
        },
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
        transform: node => {
          const input = node.getByRole('checkbox', { hidden: true })
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
        transform: async node => {
          await act(async () => {
            await userEvent.click(node.getByRole('checkbox', { hidden: true }))
            // to trigger error
            await userEvent.click(node.getByRole('checkbox', { hidden: true }))
            await userEvent.click(node.getByText('Focus'))
          })
          const error = node.getByText(mockErrors.REQUIRED as string)
          expect(error).toBeVisible()
        },
      },
    ))
})
