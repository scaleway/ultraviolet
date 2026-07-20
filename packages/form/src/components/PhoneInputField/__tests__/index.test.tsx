import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, vi, it } from 'vitest'
import { PhoneInputField } from '..'
import { Submit } from '../..'
import { mockFormErrors, renderWithForm } from '../../../__tests__/helpers'

describe('form - PhoneInputField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <PhoneInputField label="Phone Number" name="phone" parseNumberErrorMessage="Invalid phone number" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should validate phone number', async () => {
    const onSubmit = vi.fn()

    renderWithForm(
      <>
        <PhoneInputField label="Phone Number" name="phone" parseNumberErrorMessage="Invalid phone number" required />
        <Submit>Submit</Submit>
      </>,
      {
        defaultValues: {
          phone: '',
        },
        mode: 'onChange',
      },
      {
        errors: mockFormErrors,
        onSubmit: value => {
          onSubmit(value)
        },
      },
    )

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })

    const phoneInput = screen.getByRole('textbox')
    await userEvent.type(phoneInput, '+33612345678')
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce()
    })
  })

  it('should work with default country', async () => {
    const onSubmit = vi.fn()

    const { asFragment } = renderWithForm(
      <>
        <PhoneInputField
          defaultCountry="US"
          label="Phone Number"
          name="phone"
          parseNumberErrorMessage="Invalid phone number"
        />
        <Submit>Submit</Submit>
      </>,
      {
        defaultValues: {
          phone: '',
        },
        mode: 'onChange',
      },
      {
        errors: mockFormErrors,
        onSubmit: value => {
          onSubmit(value)
        },
      },
    )

    const phoneInput = screen.getByRole('textbox')
    await userEvent.type(phoneInput, '+12025551234')
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    await waitFor(() => {
      expect(onSubmit.mock.calls[0][0]).toStrictEqual({
        phone: '+1 202-555-1234',
      })
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should show error for invalid phone number', async () => {
    const onSubmit = vi.fn()

    renderWithForm(
      <>
        <PhoneInputField
          label="Phone Number"
          name="phone"
          parseNumberErrorMessage="This doesn't appear to be a valid phone number."
          required
        />
        <Submit>Submit</Submit>
      </>,
      {
        defaultValues: {
          phone: '',
        },
        mode: 'onChange',
      },
      {
        errors: mockFormErrors,
        onSubmit: value => {
          onSubmit(value)
        },
      },
    )

    const phoneInput = screen.getByRole('textbox')
    await userEvent.type(phoneInput, 'invalid')
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription("This doesn't appear to be a valid phone number.")
  })

  it('should be disabled when disabled prop is true', () => {
    const { asFragment } = renderWithForm(
      <PhoneInputField disabled label="Phone Number" name="phone" parseNumberErrorMessage="Invalid phone number" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
