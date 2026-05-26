import { fireEvent, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { PhoneInput } from '..'

describe('ui - PhoneInput', () => {
  it('should render correctly with basic props', async () => {
    const { asFragment, container } = renderWithTheme(
      <PhoneInput label="Phone" name="phone" onChange={() => {}} value="+33612345678" />,
    )

    await expectNoViolations(container)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should control the value', async () => {
    const onChange = vi.fn()

    const { asFragment } = renderWithTheme(
      <PhoneInput defaultCountry="FR" label="Phone" name="phone" onChange={onChange} value="+33612345678" />,
    )

    const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Phone' })
    expect(input.value).toBe('+33 6 12 34 56 78')
    await userEvent.clear(input)
    await userEvent.type(input, '+33678901234')
    expect(onChange).toHaveBeenCalled()
    expect(input.value).toBe('+33 6 78 90 12 34')
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly when input is disabled', async () => {
    const { asFragment, container } = renderWithTheme(
      <PhoneInput disabled label="Phone" name="phone" onChange={() => {}} value="+33612345678" />,
    )

    const input = screen.getByRole('textbox', { name: 'Phone' })
    expect(input).toBeDisabled()
    await expectNoViolations(container)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should display error message', async () => {
    const onChange = vi.fn()
    const errorMessage = 'Invalid phone number format'

    const { asFragment, container } = renderWithTheme(
      <PhoneInput error={errorMessage} label="Phone" name="phone" onChange={onChange} value="+33612345678" />,
    )

    const input = screen.getByRole('textbox', { name: 'Phone' })
    expect(input).toBeInvalid()
    expect(input).toHaveAccessibleDescription(errorMessage)

    await expectNoViolations(container)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly with required field', () => {
    const { asFragment } = renderWithTheme(
      <PhoneInput label="Phone" name="phone" onChange={() => {}} required value="+33612345678" />,
    )

    expect(screen.getByText('*')).toBeDefined()
    expect(screen.getByRole('textbox')).toBeRequired()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should have a placeholder', () => {
    const onChange = vi.fn()

    const { asFragment } = renderWithTheme(
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
    expect(asFragment()).toMatchSnapshot()
  })

  it('should call onFocus and onBlur handlers', () => {
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

  it('should have correct type attribute', () => {
    const onChange = vi.fn()

    renderWithTheme(<PhoneInput label="Phone" name="phone" onChange={onChange} value="+33612345678" />)

    const input = screen.getByRole<HTMLInputElement>('textbox')
    expect(input.type).toBe('tel')
  })

  it('should respect maxLength attribute', () => {
    const onChange = vi.fn()

    renderWithTheme(<PhoneInput label="Phone" name="phone" onChange={onChange} value="+33612345678" />)

    const input = screen.getByRole<HTMLInputElement>('textbox')
    expect(input.maxLength).toBe(20)
  })

  it('should format number on change', async () => {
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

    const input = screen.getByPlaceholderText<HTMLInputElement>('Enter phone number')
    await userEvent.type(input, '0612345678')
    const inputRole = screen.getByRole<HTMLInputElement>('textbox')
    expect(inputRole).toHaveValue('+33 6 12 34 56 78')
  })

  it('should respect disableAutoFormat prop', async () => {
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

  it('should call onValueChange with parsed metadata', async () => {
    const onValueChange = vi.fn()
    const onChange = vi.fn()

    const { container, asFragment } = renderWithTheme(
      <PhoneInput
        defaultCountry="FR"
        label="Phone"
        name="phone"
        onChange={onChange}
        onValueChange={onValueChange}
        placeholder="Enter phone number"
      />,
    )

    const input = screen.getByPlaceholderText<HTMLInputElement>('Enter phone number')
    await userEvent.type(input, '0612345678')

    await waitFor(() => expect(input.value).toBe('+33 6 12 34 56 78'))
    await expectNoViolations(container)
    expect(onValueChange).toHaveBeenCalled()
    expect(onValueChange).toHaveBeenCalledWith({
      inputValue: '0612345678',
      formatted: '+33 6 12 34 56 78',
      country: 'FR',
      valid: true,
      e164: '+33612345678',
      international: '+33 6 12 34 56 78',
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should format value when value prop changes', () => {
    const onValueChange = vi.fn()
    const onChange = vi.fn()
    const firstPhone = '0612345678'
    const secondPhone = '0699887766'

    const { rerender } = renderWithTheme(
      <PhoneInput
        defaultCountry="FR"
        label="Phone"
        name="phone"
        onChange={onChange}
        onValueChange={onValueChange}
        value={firstPhone}
      />,
    )

    const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Phone' })
    expect(input.value).toBe('+33 6 12 34 56 78')

    onValueChange.mockClear()

    rerender(
      <PhoneInput
        defaultCountry="FR"
        label="Phone"
        name="phone"
        onChange={onChange}
        onValueChange={onValueChange}
        value={secondPhone}
      />,
    )

    expect(input.value).toBe('+33 6 99 88 77 66')
    expect(onValueChange).toHaveBeenCalledWith({
      inputValue: '0699887766',
      formatted: '+33 6 99 88 77 66',
      country: 'FR',
      valid: true,
      e164: '+33699887766',
      international: '+33 6 99 88 77 66',
    })
  })
})
