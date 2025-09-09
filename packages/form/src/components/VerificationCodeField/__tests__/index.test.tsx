import { renderWithForm } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { VerificationCodeField } from '..'

describe('verificationCodeField', () => {
  test('should render correctly', () => {
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
