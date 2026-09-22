import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { VerificationCodeField } from '..'
import { mockFormErrors, renderWithForm } from '../../../__tests__/helpers'

describe('verificationCodeField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(<VerificationCodeField label="Code" name="code" placeholder="0" required />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders one input per field', () => {
    renderWithForm(<VerificationCodeField label="Code" name="code" />)
    expect(screen.getAllByRole('textbox')).toHaveLength(4)
  })

  it('calls onChange and updates the field value while typing', async () => {
    const onChange = vi.fn()
    const { resultForm } = renderWithForm(<VerificationCodeField label="Code" name="code" onChange={onChange} />)
    const [first, second] = screen.getAllByRole('textbox')
    await userEvent.type(first, '1')
    await userEvent.type(second, '2')
    expect(onChange).toHaveBeenLastCalledWith('12')
    expect(resultForm.current.getValues('code')).toBe('12')
  })

  it('shows a required error when the code is incomplete', async () => {
    renderWithForm(
      <>
        <VerificationCodeField errorLabel="errorLabel" label="Code" name="code" required />
        <div>Focus</div>
      </>,
      { mode: 'onChange' },
      { errors: mockFormErrors },
    )
    const [first] = screen.getAllByRole('textbox')
    await userEvent.type(first, '1')
    await userEvent.click(screen.getByText('Focus'))
    expect(screen.getByText(mockFormErrors.required({ label: '' }))).toBeVisible()
  })
})
