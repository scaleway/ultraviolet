import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { NumberInput } from '..'

describe('NumberInput', () => {
  it('should renders correctly', () => {
    const { asFragment } = renderWithTheme(
      <NumberInput
        minValue={0}
        maxValue={100}
        text="unit"
        onChange={() => {}}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should renders correctly disabled', () => {
    shouldMatchEmotionSnapshot(<NumberInput disabled />)
  })

  it('should renders correctly with error', () =>
    shouldMatchEmotionSnapshot(<NumberInput error="This is an error" />))

  it('should renders correctly with placeholder', () => {
    shouldMatchEmotionSnapshot(<NumberInput placeholder="Enter a value here" />)
  })

  it('should renders correctly min value', () => {
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} maxValue={100} text="unit" />,
    )
  })

  it('should renders correctly max value', () => {
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} maxValue={100} text="unit" />,
    )
  })

  it('should renders large size', () => {
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} maxValue={100} size="large" />,
    )
  })

  it('should renders small size', () => {
    shouldMatchEmotionSnapshot(
      <NumberInput minValue={0} maxValue={100} size="small" />,
    )
  })

  it('should click on center button', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput minValue={0} step={1} maxValue={100} defaultValue={10} />,
    )
    const inputButton = screen.getByLabelText('Number Input')
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(inputButton)
    await waitFor(() => expect(input.value).toBe('10'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should click on min button', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput minValue={0} step={1} maxValue={100} defaultValue={10} />,
    )
    const minus = screen.getByLabelText('Minus')
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(minus)
    await waitFor(() => expect(input.value).toBe('9'))

    await userEvent.click(minus)
    await waitFor(() => expect(input.value).toBe('8'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should click on plus button with a step value', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput
        minValue={0}
        step={10}
        maxValue={100}
        defaultValue={10}
        onBlur={() => {}}
      />,
    )
    const plus = screen.getByLabelText('Plus')
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(plus)
    await waitFor(() => expect(input.value).toBe('20'))

    await userEvent.click(plus)
    await waitFor(() => expect(input.value).toBe('30'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should focus input and modify value', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput minValue={0} step={10} maxValue={100} defaultValue={10} />,
    )
    const buttonContainer = screen.getByLabelText('Number Input')
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(buttonContainer)
    await waitFor(() => expect(input).toHaveFocus())
    act(() => {
      input.blur()
    })

    await userEvent.click(buttonContainer)
    await userEvent.clear(input)
    await userEvent.type(input, '20')
    await waitFor(() => expect(input.value).toBe('20'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should focus input and modify value onMinCrossed', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput
        minValue={10}
        maxValue={100}
        defaultValue={30}
        onMinCrossed={() => {}}
      />,
    )
    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    // eslint-disable-next-line testing-library/no-node-access
    if (input.parentElement) await userEvent.click(input.parentElement)
    await userEvent.clear(input)
    await userEvent.type(input, '1')
    await waitFor(() => expect(input.value).toBe('1'))
    act(() => {
      input.blur()
    })
    await waitFor(() => expect(input.value).toBe('10'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should focus input and modify value onMaxCrossed', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput
        minValue={10}
        maxValue={100}
        defaultValue={30}
        onMaxCrossed={() => {}}
      />,
    )
    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    // eslint-disable-next-line testing-library/no-node-access
    if (input.parentElement) await userEvent.click(input.parentElement)
    await userEvent.clear(input)
    await userEvent.type(input, '120')
    await waitFor(() => expect(input.value).toBe('120'))
    act(() => {
      input.blur()
    })
    await waitFor(() => expect(input.value).toBe('100'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should increase and decrease input with arrow up and down', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput minValue={10} maxValue={100} defaultValue={30} />,
    )
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
    expect(asFragment()).toMatchSnapshot()
  })

  it('should click on plus button with a step value and an in-between value set', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput
        minValue={0}
        step={10}
        maxValue={100}
        defaultValue={12}
        onBlur={() => {}}
      />,
    )
    const plus = screen.getByLabelText('Plus')
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(plus)
    await waitFor(() => expect(input.value).toBe('20'))

    await userEvent.click(plus)
    await waitFor(() => expect(input.value).toBe('30'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should increase and decrease input with arrow up and down, step and an in-between value set', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput minValue={10} maxValue={100} defaultValue={32} step={10} />,
    )

    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    await waitFor(() => expect(input.value).toBe('32'))

    act(() => {
      input.focus()
    })
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
    expect(asFragment()).toMatchSnapshot()
  })

  it('should not changed controlled value on click min button', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput minValue={0} step={1} maxValue={100} value={10} />,
    )
    const minus = screen.getByLabelText('Minus')
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(minus)
    await waitFor(() => expect(input.value).toBe('10'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should use the defaultValue', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput defaultValue={10} minValue={0} maxValue={100} />,
    )
    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    await waitFor(() => expect(input.value).toBe('10'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should use minValue instead of defaultValue if default value is lower than minValue', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput defaultValue={10} minValue={20} maxValue={100} />,
    )
    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    await waitFor(() => expect(input.value).toBe('20'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should use maxValue instead of defaultValue if default value is higher than maxValue', async () => {
    const { asFragment } = renderWithTheme(
      <NumberInput defaultValue={150} minValue={20} step={1} maxValue={100} />,
    )
    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    await waitFor(() => expect(input.value).toBe('100'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should set value at minValue when value is lesser than minValue', async () => {
    renderWithTheme(<NumberInput minValue={10} value={null} />)
    const buttonContainer = screen.getByLabelText('Number Input')
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(buttonContainer)
    await userEvent.clear(input)
    await userEvent.type(input, '5')

    act(() => {
      input.blur()
    })
    await waitFor(() => expect(input.value).toBe('10'))
  })

  it('should set value at maxValue when value is greater than maxValue', async () => {
    renderWithTheme(<NumberInput maxValue={10} value={null} />)
    const buttonContainer = screen.getByLabelText('Number Input')
    const input = screen.getByRole<HTMLInputElement>('spinbutton')

    await userEvent.click(buttonContainer)
    await userEvent.clear(input)
    await userEvent.type(input, '15')

    act(() => {
      input.blur()
    })
    await waitFor(() => expect(input.value).toBe('10'))
  })
})
