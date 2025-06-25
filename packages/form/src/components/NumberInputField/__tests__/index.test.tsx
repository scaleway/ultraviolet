import { act, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { NumberInputField } from '../..'

describe('NumberInputField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(<NumberInputField name="test" />, {
      defaultValues: {
        test: 0,
      },
    })
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <NumberInputField name="test" disabled />,
      {
        defaultValues: {
          test: 10,
        },
      },
    )
    const input = screen.getByLabelText('Number Input')
    expect(input).toBeDisabled()

    const inputMinus = screen.getByLabelText('Minus')
    expect(inputMinus).toBeDisabled()

    const inputPlus = screen.getByLabelText('Plus')
    expect(inputPlus).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events correctly', async () => {
    const onFocus = vi.fn(() => {})
    const onChange = vi.fn(() => {})
    const onBlur = vi.fn(() => {})

    const { asFragment } = renderWithForm(
      <NumberInputField
        name="test"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />,
      {
        defaultValues: {
          test: 10,
        },
      },
    )
    const input = screen.getByLabelText('Number Input')
    act(() => {
      input.focus()
    })
    expect(onFocus).toBeCalledTimes(1)
    await userEvent.click(input)
    expect(onChange).toBeCalledTimes(0)
    act(() => {
      input.blur()
    })
    expect(onBlur).toBeCalledTimes(1)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger event onMinCrossed & onMaxCrossed', async () => {
    const onMinCrossed = vi.fn(() => {})
    const onMaxCrossed = vi.fn(() => {})
    const minValue = 5
    const maxValue = 20

    const { asFragment } = renderWithForm(
      <NumberInputField
        maxValue={maxValue}
        minValue={minValue}
        name="test"
        onMinCrossed={onMinCrossed}
        onMaxCrossed={onMaxCrossed}
      />,
      {
        defaultValues: {
          test: 10,
        },
      },
    )
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

    expect(asFragment()).toMatchSnapshot()
  })
})
