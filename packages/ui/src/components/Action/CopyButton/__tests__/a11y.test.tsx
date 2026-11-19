import { expectNoViolations } from '@utils/test'
import { describe, it } from 'vitest'
import { CopyButton } from '..'
import { renderWithTheme, THEMES } from '../../../../__tests__/helpers'

describe('copy button - A11y', { tags: ['a11y'] }, () => {
  it.for(THEMES)('should render with default props  theme %s ', async currentTheme => {
    const { container } = renderWithTheme(<CopyButton value="copy" />, currentTheme)

    await expectNoViolations(container)
  })
})
