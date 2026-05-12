import { consoleThemes } from '@ultraviolet/themes'
import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, it } from 'vitest'
import { CopyButton } from '..'

describe('copy button - A11y', { tags: ['a11y'] }, () => {
  it.todo.each(consoleThemes)('should render with default props  theme %s ', async (_, currentTheme) => {
    const { container } = renderWithTheme(<CopyButton value="copy" />, currentTheme)

    await expectNoViolations(container)
  })
})
