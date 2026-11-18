import { expectNoViolations } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { WireIllustration } from '..'
import { renderWithTheme } from '../../../__tests__/helpers'

describe('wireIllustration - A11y', { tags: ['a11y'] }, () => {
  it('should be decorative by default', () => {
    const { queryByRole } = renderWithTheme(<WireIllustration name="instance" />)

    expect(queryByRole('img')).not.toBeInTheDocument()
  })

  it('should not have violations with default props', async () => {
    const { container } = renderWithTheme(<WireIllustration name="instance" />)
    await expectNoViolations(container)
  })
})
