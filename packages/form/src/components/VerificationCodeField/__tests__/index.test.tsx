import { describe, expect, it } from 'vitest'
import { VerificationCodeField } from '..'
import { renderWithForm } from '../../../__tests__/helpers'

describe('verificationCodeField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(<VerificationCodeField label="Code" name="code" placeholder="0" required />)
    expect(asFragment()).toMatchSnapshot()
  })
})
