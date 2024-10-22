import { renderWithForm } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { VerificationCodeField } from '..'

describe('VerificationCodeField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <VerificationCodeField
        name="code"
        label="Code"
        placeholder="0"
        required
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
