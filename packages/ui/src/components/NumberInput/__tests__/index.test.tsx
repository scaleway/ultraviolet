import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { NumberInput } from '..'

describe('NumberInput', () => {
  it('should renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput min={0} max={100} onChange={() => {}} />,
    ))

  it('should renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(<NumberInput disabled />))

  it('should renders correctly without controls', () =>
    shouldMatchEmotionSnapshot(<NumberInput controls={false} />))

  it('should renders correctly with label', () =>
    shouldMatchEmotionSnapshot(<NumberInput label="Label" />))

  it('should renders correctly with label description', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput labelDescription={<div>label description</div>} />,
    ))

  it('should renders correctly with error', () =>
    shouldMatchEmotionSnapshot(<NumberInput error="This is an error" />))

  it('should renders correctly with success', () =>
    shouldMatchEmotionSnapshot(<NumberInput success="This is a success" />))

  it('should renders correctly with placeholder', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput placeholder="Enter a value here" />,
    ))

  it('should renders correctly min value', () =>
    shouldMatchEmotionSnapshot(<NumberInput min={0} max={100} />))

  it('should renders correctly max value', () =>
    shouldMatchEmotionSnapshot(<NumberInput min={0} max={100} />))

  describe('should renders correctly all sizes', () => {
    ;(['large', 'medium', 'small'] as const).forEach(size => {
      it(`with size ${size}`, () =>
        shouldMatchEmotionSnapshot(
          <NumberInput min={0} max={100} size={size} />,
        ))
      it(`with size ${size} and unit`, () =>
        shouldMatchEmotionSnapshot(
          <NumberInput min={0} max={100} size={size} unit="GB" />,
        ))
    })
  })

  it('should click on min button', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput min={0} step={1} max={100} value={10} />,
    )

    const minus = screen.getByLabelText('minus')
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(minus)
    await waitFor(() => expect(input.value).toBe('9'))

    await userEvent.click(minus)
    await waitFor(() => expect(input.value).toBe('8'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should click on plus button with a step value', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput min={0} step={10} max={100} onBlur={() => {}} />,
    )
    const plus = screen.getByLabelText('plus')
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(plus)
    await waitFor(() => expect(input.value).toBe('10'))

    await userEvent.click(plus)
    await waitFor(() => expect(input.value).toBe('20'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should focus input and modify value', async () => {
    const onChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <NumberInput
        min={10}
        step={10}
        max={100}
        onChange={onChange}
        value={1}
      />,
    )
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(input)
    await waitFor(() => expect(input).toHaveFocus())
    input.blur()

    await userEvent.clear(input)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(asFragment()).toMatchSnapshot()
  })
  it('should focus input and modify value when value > max', async () => {
    const onChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <NumberInput min={1} step={1} max={5} onChange={onChange} value={10} />,
    )
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(input)
    await waitFor(() => expect(input).toHaveFocus())
    input.blur()

    await userEvent.clear(input)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should click on plus button with a step value and an in-between value set', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput min={0} step={10} max={100} onBlur={() => {}} />,
    )
    const plus = screen.getByLabelText('plus')
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(plus)
    await waitFor(() => expect(input.value).toBe('10'))

    await userEvent.click(plus)
    await waitFor(() => expect(input.value).toBe('20'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should set value at min when value is lesser than min', async () => {
    renderWithTheme(<NumberInput min={10} />)
    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    const plusButton = screen.getByLabelText('plus')

    await userEvent.clear(input)
    await userEvent.type(input, '5')

    plusButton.click()
    await waitFor(() => expect(input.value).toBe('10'))
  })

  it('should set value at max when value is greater than max', async () => {
    renderWithTheme(<NumberInput max={10} />)
    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    const minusButton = screen.getByLabelText('minus')

    await userEvent.clear(input)
    await userEvent.type(input, '15')

    minusButton.click()
    await waitFor(() => expect(input.value).toBe('10'))
  })
})
