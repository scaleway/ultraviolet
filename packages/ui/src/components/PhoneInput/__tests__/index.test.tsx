import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'

import { PhoneInput } from '..'

describe('ui - PhoneInput', () => {
  test('should render correctly with basic props', () =>
    shouldMatchSnapshot(
      <PhoneInput
        label="Phone"
        name="phone"
        onChange={() => {}}
        value="+33612345678"
      />,
    ))

  test('should control the value', () => {
    const onChange = vi.fn()

    renderWithTheme(
      <PhoneInput
        label="Phone"
        name="phone"
        onChange={onChange}
        value="+33612345678"
      />,
    )

    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('+33612345678')
    fireEvent.change(input, { target: { value: '+33678901234' } })
    expect(onChange).toHaveBeenCalled()
  })

  test('should render correctly when input is disabled', () =>
    shouldMatchSnapshot(
      <PhoneInput
        disabled
        label="Phone"
        name="phone"
        onChange={() => {}}
        value="+33612345678"
      />,
    ))

  test('should render correctly with error', () =>
    shouldMatchSnapshot(
      <PhoneInput
        error="Invalid phone number"
        label="Phone"
        name="phone"
        onChange={() => {}}
        value="+33612345678"
      />,
    ))

  test('should display error message', () => {
    const onChange = vi.fn()
    const errorMessage = 'Invalid phone number format'

    renderWithTheme(
      <PhoneInput
        error={errorMessage}
        label="Phone"
        name="phone"
        onChange={onChange}
        value="+33612345678"
      />,
    )

    expect(screen.getByText(errorMessage)).toBeDefined()
  })

  test('should render correctly with required field', () =>
    shouldMatchSnapshot(
      <PhoneInput
        label="Phone"
        name="phone"
        onChange={() => {}}
        required
        value="+33612345678"
      />,
    ))

  test('should display asterisk for required field', () => {
    const onChange = vi.fn()

    renderWithTheme(
      <PhoneInput
        label="Phone"
        name="phone"
        onChange={onChange}
        required
        value="+33612345678"
      />,
    )

    expect(screen.getByText('*')).toBeDefined()
  })

  test('should use default country', () => {
    const onChange = vi.fn()

    renderWithTheme(
      <PhoneInput
        defaultCountry="US"
        label="Phone"
        name="phone"
        onChange={onChange}
        placeholder="Enter phone number"
      />,
    )

    const input = screen.getByPlaceholderText('Enter phone number')
    expect(input).toBeDefined()
  })

  test('should call onFocus and onBlur handlers', () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const onChange = vi.fn()

    renderWithTheme(
      <PhoneInput
        label="Phone"
        name="phone"
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        value="+33612345678"
      />,
    )

    const input = screen.getByRole('textbox')
    fireEvent.focus(input)
    expect(onFocus).toHaveBeenCalled()
    fireEvent.blur(input)
    expect(onBlur).toHaveBeenCalled()
  })

  test('should have correct type attribute', () => {
    const onChange = vi.fn()

    renderWithTheme(
      <PhoneInput
        label="Phone"
        name="phone"
        onChange={onChange}
        value="+33612345678"
      />,
    )

    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.type).toBe('tel')
  })

  test('should respect maxLength attribute', () => {
    const onChange = vi.fn()

    renderWithTheme(
      <PhoneInput
        label="Phone"
        name="phone"
        onChange={onChange}
        value="+33612345678"
      />,
    )

    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.maxLength).toBe(20)
  })

  test('should format number on change', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <PhoneInput
        defaultCountry="FR"
        label="Phone"
        name="phone"
        onChange={onChange}
        placeholder="Enter phone number"
      />,
    )

    const input = screen.getByPlaceholderText('Enter phone number')
    await userEvent.type(input, '0612345678')
    expect(onChange).toHaveBeenCalled()
  })

  test('should respect disableAutoFormat prop', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <PhoneInput
        defaultCountry="FR"
        disableAutoFormat
        label="Phone"
        name="phone"
        onChange={onChange}
        placeholder="Enter phone number"
      />,
    )

    const input = screen.getByPlaceholderText('Enter phone number')
    await userEvent.type(input, '0612345678')
    expect(input).toHaveValue('0612345678')
  })

  test('should call onValueChange with parsed metadata', async () => {
    const onValueChange = vi.fn()
    const onChange = vi.fn()

    renderWithTheme(
      <PhoneInput
        defaultCountry="FR"
        label="Phone"
        name="phone"
        onChange={onChange}
        onValueChange={onValueChange}
        placeholder="Enter phone number"
      />,
    )

    const input = screen.getByPlaceholderText('Enter phone number')
    await userEvent.type(input, '0612345678')

    expect(onValueChange).toHaveBeenCalled()
    const callArg = onValueChange.mock.calls[0]?.[0]
    expect(callArg).toHaveProperty('inputValue')
    expect(callArg).toHaveProperty('formatted')
    expect(callArg).toHaveProperty('country')
    expect(callArg).toHaveProperty('valid')
    expect(callArg).toHaveProperty('e164')
    expect(callArg).toHaveProperty('international')
  })

  test('should call onValueChange with metadata', async () => {
    const onValueChange = vi.fn()
    const onChange = vi.fn()

    renderWithTheme(
      <PhoneInput
        defaultCountry="FR"
        label="Phone"
        name="phone"
        onChange={onChange}
        onValueChange={onValueChange}
        placeholder="Enter phone number"
      />,
    )

    const input = screen.getByPlaceholderText('Enter phone number')
    await userEvent.type(input, '0612345678')

    expect(onValueChange).toHaveBeenCalled()
    const callArg = onValueChange.mock.calls[0]?.[0]
    expect(callArg).toHaveProperty('inputValue')
    expect(callArg).toHaveProperty('country')
  })
})
