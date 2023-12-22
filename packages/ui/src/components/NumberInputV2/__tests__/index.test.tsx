import { describe, expect, it } from '@jest/globals'
import { fireEvent, screen, waitFor } from '@testing-library/react'
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

  it('should renders correctly with placeholder', () =>
    shouldMatchEmotionSnapshot(
      <NumberInputV2 placeholder="Enter a value here" />,
    ))

  it('should renders correctly min value', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 min={0} max={100} />))

  it('should renders correctly max value', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 min={0} max={100} />))

  it('should renders large size', () =>
    shouldMatchEmotionSnapshot(
      <NumberInputV2 min={0} max={100} size="large" />,
    ))

  it('should renders small size', () =>
    shouldMatchEmotionSnapshot(
      <NumberInputV2 min={0} max={100} size="small" />,
    ))

  it('should click on center button', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 min={0} step={1} max={100} />, {
      transform: async () => {
        const inputButton = screen.getByLabelText('Number Input')
        const input = screen.getByRole<HTMLInputElement>('spinbutton')

        await userEvent.click(inputButton)
        await waitFor(() => expect(input.value).toBe('10'))
      },
    }))

  it('should click on min button', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 min={0} step={1} max={100} />, {
      transform: async () => {
        const minus = screen.getByLabelText('Minus')
        const input = screen.getByRole<HTMLInputElement>('spinbutton')

        await userEvent.click(minus)
        await waitFor(() => expect(input.value).toBe('9'))

        await userEvent.click(minus)
        await waitFor(() => expect(input.value).toBe('8'))
      },
    }))

  it('should click on plus button with a step value', () =>
    shouldMatchEmotionSnapshot(
      <NumberInputV2 min={0} step={10} max={100} onBlur={() => {}} />,
      {
        transform: async () => {
          const plus = screen.getByLabelText('Plus')
          const input = screen.getByRole<HTMLInputElement>('spinbutton')

          await userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('20'))

          await userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('30'))
        },
      },
    ))

  it('should focus input and modify value', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 min={0} step={10} max={100} />, {
      transform: async () => {
        const buttonContainer = screen.getByLabelText('Number Input')
        const input = screen.getByRole<HTMLInputElement>('spinbutton')

        await userEvent.click(buttonContainer)
        await waitFor(() => expect(input).toHaveFocus())
        input.blur()

        await userEvent.click(buttonContainer)
        await userEvent.clear(input)
        await userEvent.type(input, '20')
        await waitFor(() => expect(input.value).toBe('20'))
      },
    }))

  it('should increase and decrease input with arrow up and down', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 min={10} max={100} />, {
      transform: async () => {
        const input = screen.getByRole<HTMLInputElement>('spinbutton')
        // eslint-disable-next-line testing-library/no-node-access
        if (input.parentElement) await userEvent.click(input.parentElement)
        await userEvent.click(input)
        fireEvent.keyDown(input, {
          key: 'ArrowUp',
          keyCode: 38,
        })
        await waitFor(() => expect(input.value).toBe('31'))
        fireEvent.keyDown(input, {
          key: 'ArrowDown',
          keyCode: 40,
        })
        await waitFor(() => expect(input.value).toBe('30'))
        await userEvent.clear(input)
        await userEvent.type(input, '10')
        fireEvent.keyDown(input, {
          key: 'ArrowDown',
          keyCode: 40,
        })
        await waitFor(() => expect(input.value).toBe('10'))
        await userEvent.clear(input)
        await userEvent.type(input, '100')
        fireEvent.keyDown(input, {
          key: 'ArrowUp',
          keyCode: 38,
        })
        await waitFor(() => expect(input.value).toBe('100'))
      },
    }))

  it('should click on plus button with a step value and an in-between value set', () =>
    shouldMatchEmotionSnapshot(
      <NumberInputV2 min={0} step={10} max={100} onBlur={() => {}} />,
      {
        transform: async () => {
          const plus = screen.getByLabelText('Plus')
          const input = screen.getByRole<HTMLInputElement>('spinbutton')

          await userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('20'))

          await userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('30'))
        },
      },
    ))

  it('should increase and decrease input with arrow up and down, step and an in-between value set', async () => {
    renderWithTheme(<NumberInputV2 min={10} max={100} step={10} />)

    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    await waitFor(() => expect(input.value).toBe('32'))

    input.focus()
    expect(input).toHaveFocus()

    fireEvent.keyDown(input, {
      key: 'ArrowUp',
      keyCode: 38,
    })
    await waitFor(() => expect(input.value).toBe('40'))

    fireEvent.keyDown(input, {
      key: 'ArrowDown',
      keyCode: 40,
    })
    await waitFor(() => expect(input.value).toBe('30'))
    await userEvent.clear(input)
    await userEvent.type(input, '12')
    fireEvent.keyDown(input, {
      key: 'ArrowDown',
      keyCode: 40,
    })
    await waitFor(() => expect(input.value).toBe('10'))
    await userEvent.clear(input)
    await userEvent.type(input, '99')

    fireEvent.keyDown(input, {
      key: 'ArrowUp',
      keyCode: 38,
    })
    await waitFor(() => expect(input.value).toBe('100'))
  })

  it('should not changed controlled value on click min button', () =>
    shouldMatchEmotionSnapshot(
      <NumberInputV2 min={0} step={1} max={100} value={10} />,
      {
        transform: async () => {
          const minus = screen.getByLabelText('Minus')
          const input = screen.getByRole<HTMLInputElement>('spinbutton')

          await userEvent.click(minus)
          await waitFor(() => expect(input.value).toBe('10'))
        },
      },
    ))

  it('should use the defaultValue', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 min={0} max={100} />, {
      transform: async () => {
        const input = screen.getByRole<HTMLInputElement>('spinbutton')
        await waitFor(() => expect(input.value).toBe('10'))
      },
    }))

  it('should use min instead of defaultValue if default value is lower than min', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 min={20} max={100} />, {
      transform: async () => {
        const input = screen.getByRole<HTMLInputElement>('spinbutton')
        await waitFor(() => expect(input.value).toBe('20'))
      },
    }))

  it('should use max instead of defaultValue if default value is higher than max', () =>
    shouldMatchEmotionSnapshot(<NumberInputV2 min={20} step={1} max={100} />, {
      transform: async () => {
        const input = screen.getByRole<HTMLInputElement>('spinbutton')
        await waitFor(() => expect(input.value).toBe('100'))
      },
    }))

  it('should set value at min when value is lesser than min', async () => {
    renderWithTheme(<NumberInputV2 min={10} />)
    const buttonContainer = screen.getByLabelText('Number Input')
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(buttonContainer)
    await userEvent.clear(input)
    await userEvent.type(input, '5')

    input.blur()
    await waitFor(() => expect(input.value).toBe('10'))
  })

  it('should set value at max when value is greater than max', async () => {
    renderWithTheme(<NumberInputV2 max={10} />)
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.clear(input)
    await userEvent.type(input, '15')

    input.blur()
    await waitFor(() => expect(input.value).toBe('10'))
  })
})
