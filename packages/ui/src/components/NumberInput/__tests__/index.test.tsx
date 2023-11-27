import { describe, expect, it } from '@jest/globals'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NumberInput } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'

describe('NumberInput', () => {
  it('should renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput
        minValue={0}
        maxValue={100}
        text="unit"
        onChange={() => {}}
      />,
    ))

  it('should renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(<NumberInput disabled />))

  it('should renders correctly with error', () =>
    shouldMatchEmotionSnapshot(<NumberInput error="This is an error" />))

  it('should renders correctly with placeholder', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput placeholder="Enter a value here" />,
    ))

  it('should renders correctly min value', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} maxValue={100} text="unit" />,
    ))

  it('should renders correctly max value', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} maxValue={100} text="unit" />,
    ))

  it('should renders large size', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} maxValue={100} size="large" />,
    ))

  it('should renders small size', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} maxValue={100} size="small" />,
    ))

  it('should click on center button', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} step={1} maxValue={100} defaultValue={10} />,
      {
        transform: async () => {
          const inputButton = screen.getByLabelText('Number Input')
          const input = screen.getByRole<HTMLInputElement>('spinbutton')

          await userEvent.click(inputButton)
          await waitFor(() => expect(input.value).toBe('10'))
        },
      },
    ))

  it('should click on min button', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} step={1} maxValue={100} defaultValue={10} />,
      {
        transform: async () => {
          const minus = screen.getByLabelText('Minus')
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
      <NumberInput
        minValue={0}
        step={10}
        maxValue={100}
        defaultValue={10}
        onBlur={() => {}}
      />,
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
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} step={10} maxValue={100} defaultValue={10} />,
      {
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
      },
    ))
  it('should focus input and modify value onMinCrossed', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput
        minValue={10}
        maxValue={100}
        defaultValue={30}
        onMinCrossed={() => {}}
      />,
      {
        transform: async () => {
          const input = screen.getByRole<HTMLInputElement>('spinbutton')
          // eslint-disable-next-line testing-library/no-node-access
          if (input.parentElement) await userEvent.click(input.parentElement)
          await userEvent.clear(input)
          await userEvent.type(input, '1')
          await waitFor(() => expect(input.value).toBe('1'))
          input.blur()
          await waitFor(() => expect(input.value).toBe('10'))
        },
      },
    ))

  it('should focus input and modify value onMaxCrossed', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput
        minValue={10}
        maxValue={100}
        defaultValue={30}
        onMaxCrossed={() => {}}
      />,
      {
        transform: async () => {
          const input = screen.getByRole<HTMLInputElement>('spinbutton')
          // eslint-disable-next-line testing-library/no-node-access
          if (input.parentElement) await userEvent.click(input.parentElement)
          await userEvent.clear(input)
          await userEvent.type(input, '120')
          await waitFor(() => expect(input.value).toBe('120'))
          input.blur()
          await waitFor(() => expect(input.value).toBe('100'))
        },
      },
    ))

  it('should increase and decrease input with arrow up and down', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={10} maxValue={100} defaultValue={30} />,
      {
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
      },
    ))

  it('should click on plus button with a step value and an in-between value set', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput
        minValue={0}
        step={10}
        maxValue={100}
        defaultValue={12}
        onBlur={() => {}}
      />,
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
    renderWithTheme(
      <NumberInput minValue={10} maxValue={100} defaultValue={32} step={10} />,
    )

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
      <NumberInput minValue={0} step={1} maxValue={100} value={10} />,
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
    shouldMatchEmotionSnapshot(
      <NumberInput defaultValue={10} minValue={0} maxValue={100} />,
      {
        transform: async () => {
          const input = screen.getByRole<HTMLInputElement>('spinbutton')
          await waitFor(() => expect(input.value).toBe('10'))
        },
      },
    ))

  it('should use minValue instead of defaultValue if default value is lower than minValue', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput defaultValue={10} minValue={20} maxValue={100} />,
      {
        transform: async () => {
          const input = screen.getByRole<HTMLInputElement>('spinbutton')
          await waitFor(() => expect(input.value).toBe('20'))
        },
      },
    ))

  it('should use maxValue instead of defaultValue if default value is higher than maxValue', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput defaultValue={150} minValue={20} step={1} maxValue={100} />,
      {
        transform: async () => {
          const input = screen.getByRole<HTMLInputElement>('spinbutton')
          await waitFor(() => expect(input.value).toBe('100'))
        },
      },
    ))

  it('should set value at minValue when value is lesser than minValue', async () => {
    renderWithTheme(<NumberInput minValue={10} value={null} />)
    const buttonContainer = screen.getByLabelText('Number Input')
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(buttonContainer)
    await userEvent.clear(input)
    await userEvent.type(input, '5')

    input.blur()
    await waitFor(() => expect(input.value).toBe('10'))
  })

  it('should set value at maxValue when value is greater than maxValue', async () => {
    renderWithTheme(<NumberInput maxValue={10} value={null} />)
    const buttonContainer = screen.getByLabelText('Number Input')
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(buttonContainer)
    await userEvent.clear(input)
    await userEvent.type(input, '15')

    input.blur()
    await waitFor(() => expect(input.value).toBe('10'))
  })
})
