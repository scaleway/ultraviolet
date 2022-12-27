import { act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form, SelectNumberField } from '../..'
import {
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'

describe('SelectNumberField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectNumberField name="test" value={0} />,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectNumberField name="test" value={10} disabled />,
      {
        transform: ({ getByLabelText }) => {
          const input = getByLabelText('Input')
          expect(input).toBeDisabled()

          const inputMinus = getByLabelText('Minus')
          expect(inputMinus).toBeDisabled()

          const inputPlus = getByLabelText('Plus')
          expect(inputPlus).toBeDisabled()
        },
      },
    ))

  test('should trigger events correctly', () => {
    const onFocus = jest.fn(() => {})
    const onChange = jest.fn(() => {})
    const onBlur = jest.fn(() => {})

    return shouldMatchEmotionSnapshotFormWrapper(
      <SelectNumberField
        name="test"
        value={10}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />,
      {
        transform: ({ getByLabelText }) => {
          const input = getByLabelText('Input')
          act(() => {
            input.focus()
          })
          expect(onFocus).toBeCalledTimes(1)
          act(() => {
            input.click()
          })
          expect(onChange).toBeCalledTimes(0)
          act(() => {
            input.blur()
          })
          expect(onBlur).toBeCalledTimes(1)
        },
      },
    )
  })

  test('should trigger event onMinCrossed & onMaxCrossed', () => {
    const onMinCrossed = jest.fn(() => {})
    const onMaxCrossed = jest.fn(() => {})
    const minValue = 5
    const maxValue = 20

    return shouldMatchEmotionSnapshot(
      <Form onRawSubmit={() => {}} errors={mockErrors}>
        <SelectNumberField
          maxValue={maxValue}
          minValue={minValue}
          name="test"
          onMinCrossed={onMinCrossed}
          onMaxCrossed={onMaxCrossed}
          value={10}
        />
      </Form>,
      {
        transform: async ({ getByLabelText }) => {
          const input = getByLabelText('Input') as HTMLTextAreaElement
          await act(async () => {
            if (input.parentElement) await userEvent.click(input.parentElement)

            // trigger onMinCrossed
            await userEvent.clear(input)
            await userEvent.type(input, '1')
          })
          await waitFor(() => expect(input.value).toBe('1'))
          act(() => {
            input.blur()
          })
          await waitFor(() => expect(input.value).toBe('5'))
          expect(onMinCrossed).toBeCalledTimes(1)

          // trigger onMaxCrossed
          await act(async () => {
            await userEvent.clear(input)
            await userEvent.type(input, '100')
          })
          await waitFor(() => expect(input.value).toBe('100'))
          act(() => {
            input.blur()
          })
          await waitFor(() => expect(input.value).toBe('20'))
          expect(onMinCrossed).toBeCalledTimes(1)
        },
      },
    )
  })
})
