import { renderWithForm } from '@utils/test'
import { describe, expect, it } from 'vitest'

import { VerificationCodeField } from '..'

describe('verificationCodeField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <VerificationCodeField
        label="Code"
        name="code"
        placeholder="0"
        required
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
