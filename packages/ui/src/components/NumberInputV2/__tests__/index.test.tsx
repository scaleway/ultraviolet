import { describe, expect, it } from '@jest/globals'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NumberInputV2 } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'

describe('NumberInputV2', () => {
  it('should renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <NumberInputV2 min={0} max={100} onChange={() => {}} />,
    ))

  it('should renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 disabled />))

  it('should renders correctly with error', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 error="This is an error" />))

  it('should renders correctly with success', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 success="This is a success" />))

  it('should renders correctly with placeholder', () =>
    shouldMatchEmotionSnapshot(
      <NumberInputV2 placeholder="Enter a value here" />,
    ))

  it('should renders correctly min value', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 min={0} max={100} />))

  it('should renders correctly max value', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 min={0} max={100} />))

  describe('should renders correctly all sizes', () => {
    ;(['large', 'medium', 'small'] as const).forEach(size => {
      it(`with size ${size}`, () =>
        shouldMatchEmotionSnapshot(
          <NumberInputV2 min={0} max={100} size={size} />,
        ))
      it(`with size ${size} and unit`, () =>
        shouldMatchEmotionSnapshot(
          <NumberInputV2 min={0} max={100} size={size} unit="GB" />,
        ))
    })
  })

  it('should click on min button', () =>
    shouldMatchEmotionSnapshot(
      <NumberInputV2 min={0} step={1} max={100} value={10} />,
      {
        transform: async () => {
          const minus = screen.getByLabelText('minus')
          const input = screen.getByRole<HTMLInputElement>('spinbutton')

          await userEvent.click(minus)
          await waitFor(() => expect(input.value).toBe('9'))

          await userEvent.click(minus)
          await waitFor(() => expect(input.value).toBe('8'))
        },
      },
    ))

  it('should click on plus button with a step value', () =>
    shouldMatchEmotionSnapshot(
      <NumberInputV2 min={0} step={10} max={100} onBlur={() => {}} />,
      {
        transform: async () => {
          const plus = screen.getByLabelText('plus')
          const input = screen.getByRole<HTMLInputElement>('spinbutton')

          await userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('10'))

          await userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('20'))
        },
      },
    ))

  it('should focus input and modify value', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 min={0} step={10} max={100} />, {
      transform: async () => {
        const input = screen.getByRole<HTMLInputElement>('spinbutton')

        await userEvent.click(input)
        await waitFor(() => expect(input).toHaveFocus())
        input.blur()

        await userEvent.clear(input)
        await userEvent.type(input, '20')
        await waitFor(() => expect(input.value).toBe('20'))
      },
    }))

  it('should click on plus button with a step value and an in-between value set', () =>
    shouldMatchEmotionSnapshot(
      <NumberInputV2 min={0} step={10} max={100} onBlur={() => {}} />,
      {
        transform: async () => {
          const plus = screen.getByLabelText('plus')
          const input = screen.getByRole<HTMLInputElement>('spinbutton')

          await userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('10'))

          await userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('20'))
        },
      },
    ))

  it('should set value at min when value is lesser than min', async () => {
    renderWithTheme(<NumberInputV2 min={10} />)
    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    const plusButton = screen.getByLabelText('plus')

    await userEvent.clear(input)
    await userEvent.type(input, '5')

    plusButton.click()
    await waitFor(() => expect(input.value).toBe('10'))
  })

  it('should set value at max when value is greater than max', async () => {
    renderWithTheme(<NumberInputV2 max={10} />)
    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    const minusButton = screen.getByLabelText('minus')

    await userEvent.clear(input)
    await userEvent.type(input, '15')

    minusButton.click()
    await waitFor(() => expect(input.value).toBe('10'))
  })
})
