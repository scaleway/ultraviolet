import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { NumberInput } from '..'

describe('numberInput', () => {
  it('should renders correctly', () =>
    shouldMatchSnapshot(<NumberInput max={100} min={0} onChange={() => {}} />))

  it('should renders correctly disabled', () =>
    shouldMatchSnapshot(<NumberInput disabled />))

  it('should renders correctly without controls', () =>
    shouldMatchSnapshot(<NumberInput controls={false} />))

  it('should renders correctly with label', () =>
    shouldMatchSnapshot(<NumberInput label="Label" />))

  it('should renders correctly with label description', () =>
    shouldMatchSnapshot(
      <NumberInput labelDescription={<div>label description</div>} />,
    ))

  it('should renders correctly with error', () =>
    shouldMatchSnapshot(<NumberInput error="This is an error" />))

  it('should renders correctly with success', () =>
    shouldMatchSnapshot(<NumberInput success="This is a success" />))

  it('should renders correctly with placeholder', () =>
    shouldMatchSnapshot(<NumberInput placeholder="Enter a value here" />))

  it('should renders correctly min value', () =>
    shouldMatchSnapshot(<NumberInput max={100} min={0} />))

  it('should renders correctly max value', () =>
    shouldMatchSnapshot(<NumberInput max={100} min={0} />))

  describe('should renders correctly all sizes', () => {
    ;(['large', 'medium', 'small'] as const).forEach(size => {
      it(`with size ${size}`, () =>
        shouldMatchSnapshot(<NumberInput max={100} min={0} size={size} />))
      it(`with size ${size} and unit`, () =>
        shouldMatchSnapshot(
          <NumberInput max={100} min={0} size={size} unit="GB" />,
        ))
    })
  })

  it('should click on min button', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput max={100} min={0} step={1} value={10} />,
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
      <NumberInput max={100} min={0} onBlur={() => {}} step={10} />,
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
        max={100}
        min={10}
        onChange={onChange}
        step={10}
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
      <NumberInput max={5} min={1} onChange={onChange} step={1} value={10} />,
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
      <NumberInput max={100} min={0} onBlur={() => {}} step={10} />,
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

    await userEvent.click(plusButton)
    await waitFor(() => expect(input.value).toBe('10'))
  })

  it('should set value at max when value is greater than max', async () => {
    renderWithTheme(<NumberInput max={10} />)
    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    const minusButton = screen.getByLabelText('minus')

    await userEvent.clear(input)
    await userEvent.type(input, '15')

    await userEvent.click(minusButton)
    await waitFor(() => expect(input.value).toBe('10'))
  })
})
