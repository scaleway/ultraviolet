import { describe, expect, test } from '@jest/globals'
import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NumberInputFieldV2 } from '../..'
import {
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

describe('NumberInputFieldV2', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <NumberInputFieldV2 name="test" value={0} />,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <NumberInputFieldV2
        name="test"
        value={10}
        disabled
        aria-label="Number Input"
      />,
      {
        transform: () => {
          const input = screen.getByLabelText('Number Input')
          expect(input).toBeDisabled()

          const inputMinus = screen.getByLabelText('minus')
          expect(inputMinus).toBeDisabled()

          const inputPlus = screen.getByLabelText('plus')
          expect(inputPlus).toBeDisabled()
        },
      },
    ))

  test('should trigger event onMinCrossed & onMaxCrossed', () => {
    const minValue = 5
    const maxValue = 20

    return shouldMatchEmotionSnapshot(
      <Form
        initialValues={{ test: 10 }}
        onRawSubmit={() => {}}
        errors={mockErrors}
      >
        <NumberInputFieldV2
          max={maxValue}
          min={minValue}
          name="test"
          aria-label="Number Input"
        />
      </Form>,
      {
        transform: async () => {
          const input =
            screen.getByLabelText<HTMLTextAreaElement>('Number Input')
          // eslint-disable-next-line testing-library/no-node-access
          if (input.parentElement) await userEvent.click(input.parentElement)

          // trigger onMinCrossed
          await userEvent.clear(input)
          await userEvent.type(input, '1')
          await waitFor(() => expect(input.value).toBe('1'))
          act(() => {
            input.blur()
          })
          await waitFor(() => expect(input.value).toBe('5'))

          // trigger onMaxCrossed
          await userEvent.clear(input)
          await userEvent.type(input, '100')
          await waitFor(() => expect(input.value).toBe('100'))
          act(() => {
            input.blur()
          })
          await waitFor(() => expect(input.value).toBe('20'))
        },
      },
    )
  })
})
