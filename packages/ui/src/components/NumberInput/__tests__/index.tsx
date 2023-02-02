import { fireEvent, waitFor } from '@testing-library/react'
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
        value={10}
        onChange={() => {}}
      />,
    ))

  it('should renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput
        minValue={0}
        maxValue={100}
        text="unit"
        value={10}
        disabled
      />,
    ))

  it('should renders correctly min value', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} maxValue={100} text="unit" value={0} />,
    ))

  it('should renders correctly max value', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} maxValue={100} text="unit" value={100} />,
    ))

  it('should renders large size', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} maxValue={100} value={10} size="large" />,
    ))

  it('should renders small size', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} maxValue={100} value={10} size="small" />,
    ))

  it('should click on center button', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} step={1} maxValue={100} value={10} />,
      {
        transform: async ({ getByRole, getByLabelText }) => {
          const inputButton = getByLabelText('Input')
          const input = getByRole('spinbutton') as HTMLInputElement

          await userEvent.click(inputButton)
          await waitFor(() => expect(input.value).toBe('10'))
        },
      },
    ))

  it('should click on min button', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} step={1} maxValue={100} value={10} />,
      {
        transform: async ({ getByRole, getByLabelText }) => {
          const minus = getByLabelText('Minus')
          const input = getByRole('spinbutton') as HTMLInputElement

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
        value={10}
        onBlur={() => {}}
      />,
      {
        transform: async ({ getByLabelText, getByRole }) => {
          const plus = getByLabelText('Plus')
          const input = getByRole('spinbutton') as HTMLInputElement

          await userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('20'))

          await userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('30'))
        },
      },
    ))

  it('should focus input and modify value', () =>
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} step={10} maxValue={100} value={10} />,
      {
        transform: async ({ getByRole, getByLabelText }) => {
          const buttonContainer = getByLabelText('Input')
          const input = getByRole('spinbutton') as HTMLInputElement

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
        value={30}
        onMinCrossed={() => {}}
      />,
      {
        transform: async ({ getByRole }) => {
          const input = getByRole('spinbutton') as HTMLInputElement
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
        value={30}
        onMaxCrossed={() => {}}
      />,
      {
        transform: async ({ getByRole }) => {
          const input = getByRole('spinbutton') as HTMLInputElement
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
      <NumberInput minValue={10} maxValue={100} value={30} />,
      {
        transform: async ({ getByRole }) => {
          const input = getByRole('spinbutton') as HTMLInputElement
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
        value={12}
        onBlur={() => {}}
      />,
      {
        transform: async ({ getByLabelText, getByRole }) => {
          const plus = getByLabelText('Plus')
          const input = getByRole('spinbutton') as HTMLInputElement

          await userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('20'))

          await userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('30'))
        },
      },
    ))

  it('should increase and decrease input with arrow up and down, step and an in-between value set', async () => {
    const node = renderWithTheme(
      <NumberInput minValue={10} maxValue={100} value={32} step={10} />,
    )

    const input = node.getByRole('spinbutton') as HTMLInputElement
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
})
