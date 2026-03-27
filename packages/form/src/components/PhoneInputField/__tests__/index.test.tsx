import { renderHook, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { mockFormErrors, renderWithForm } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'

import { PhoneField } from '..'
import { Submit } from '../..'
import { Form } from '../../Form'

describe('form - PhoneField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <PhoneField
        label="Phone Number"
        name="phone"
        parseNumberErrorMessage="Invalid phone number"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should validate phone number', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm<{ phone: string }>())

    renderWithForm(
      <Form
        errors={mockFormErrors}
        methods={result.current}
        onSubmit={onSubmit}
      >
        <PhoneField
          label="Phone Number"
          name="phone"
          parseNumberErrorMessage="Invalid phone number"
          required
        />
        <Submit>Submit</Submit>
      </Form>,
    )

    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })

    const phoneInput = screen.getByRole('textbox')
    await userEvent.type(phoneInput, '+33612345678')
    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce()
    })
  })

  test('should work with default country', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm<{ phone: string }>())

    const { asFragment } = renderWithForm(
      <Form
        errors={mockFormErrors}
        methods={result.current}
        onSubmit={onSubmit}
      >
        <PhoneField
          defaultCountry="US"
          label="Phone Number"
          name="phone"
          parseNumberErrorMessage="Invalid phone number"
        />
        <Submit>Submit</Submit>
      </Form>,
    )

    const phoneInput = screen.getByRole('textbox')
    await userEvent.type(phoneInput, '+12025551234')
    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit.mock.calls[0][0]).toEqual({
        phone: '+12025551234',
      })
    })
    expect(asFragment()).toMatchSnapshot()
  })

  test('should show error for invalid phone number', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm<{ phone: string }>())

    renderWithForm(
      <Form
        errors={mockFormErrors}
        methods={result.current}
        onSubmit={onSubmit}
      >
        <PhoneField
          label="Phone Number"
          name="phone"
          parseNumberErrorMessage="This doesn't appear to be a valid phone number."
          required
        />
        <Submit>Submit</Submit>
      </Form>,
    )

    const phoneInput = screen.getByRole('textbox')
    await userEvent.type(phoneInput, 'invalid')
    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })
    expect(
      screen.getByText("This doesn't appear to be a valid phone number."),
    ).toBeDefined()
  })

  test('should be disabled when disabled prop is true', () => {
    const { asFragment } = renderWithForm(
      <PhoneField
        disabled
        label="Phone Number"
        name="phone"
        parseNumberErrorMessage="Invalid phone number"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
