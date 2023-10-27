import { describe, expect, jest, test } from '@jest/globals'
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NumberInputField } from '../..'
import {
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

describe('NumberInputField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <NumberInputField name="test" />,
      undefined,
      {
        initialValues: {
          test: 0,
        },
      },
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <NumberInputField name="test" disabled />,
      {
        transform: () => {
          const input = screen.getByLabelText('Number Input')
          expect(input).toBeDisabled()

          const inputMinus = screen.getByLabelText('Minus')
          expect(inputMinus).toBeDisabled()

          const inputPlus = screen.getByLabelText('Plus')
          expect(inputPlus).toBeDisabled()
        },
      },
      {
        initialValues: {
          test: 10,
        },
      },
    ))

  test('should trigger events correctly', () => {
    const onFocus = jest.fn(() => {})
    const onChange = jest.fn(() => {})
    const onBlur = jest.fn(() => {})

    return shouldMatchEmotionSnapshot(
      <Form
        onRawSubmit={() => {}}
        errors={mockErrors}
        initialValues={{ test: 10 }}
      >
        <NumberInputField
          name="test"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </Form>,
      {
        transform: () => {
          const input = screen.getByLabelText('Number Input')
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
      <Form
        initialValues={{ test: 10 }}
        onRawSubmit={() => {}}
        errors={mockErrors}
      >
        <NumberInputField
          maxValue={maxValue}
          minValue={minValue}
          name="test"
          onMinCrossed={onMinCrossed}
          onMaxCrossed={onMaxCrossed}
        />
      </Form>,
      {
        transform: async () => {
          const input = screen.getByRole<HTMLInputElement>('spinbutton')

          // trigger onMinCrossed
          await userEvent.clear(input)
          expect(input.value).toBe('')
          await userEvent.type(input, '1')
          expect(input.value).toBe('1')
          await userEvent.click(document.body)
          expect(input.value).toBe('5')
          expect(onMinCrossed).toBeCalledTimes(1)

          // trigger onMaxCrossed
          await userEvent.clear(input)
          await userEvent.type(input, '100')
          expect(input.value).toBe('100')
          await userEvent.click(document.body)
          expect(input.value).toBe('20')
          expect(onMaxCrossed).toBeCalledTimes(1)
        },
      },
    )
  })
})
