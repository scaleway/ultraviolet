import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, it } from 'vitest'
import { Stack } from '..'

describe('stack - A11Y', { tags: ['a11y'] }, () => {
  it('should not have violation with default props', async () => {
    const { container } = renderWithTheme(
      <Stack>
        <div>first child</div>
        <div>second child</div>
        <div>third child</div>
      </Stack>,
    )
    await expectNoViolations(container)
  })
})
