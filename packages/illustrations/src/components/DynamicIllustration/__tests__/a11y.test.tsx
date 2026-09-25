import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { DynamicIllustration } from '..'

describe('dynamicIllustration - A11y', { tags: ['a11y'] }, () => {
  it('should be decorative by default', () => {
    const { queryByRole } = renderWithTheme(<DynamicIllustration name="empty" />)

    expect(queryByRole('img')).not.toBeInTheDocument()
  })

  it('should not have violations with default props', async () => {
    const { container } = renderWithTheme(<DynamicIllustration name="empty" />)
    await expectNoViolations(container)
  })
})
