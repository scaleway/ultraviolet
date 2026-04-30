import { PencilIcon } from '@ultraviolet/icons/PencilIcon'
import { consoleThemes } from '@ultraviolet/themes'
import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, it } from 'vitest'
import { Button } from '..'

describe('button - A11y', { tags: ['a11y'] }, () => {
  it.each(consoleThemes)('should not have violations with (theme: %s)', async (_, currentTheme) => {
    const { container } = renderWithTheme(
      <Button disabled onClick={() => {}}>
        <PencilIcon />
        Hello
      </Button>,
      currentTheme,
    )

    await expectNoViolations(container)
  })

  it.todo.each(consoleThemes)('should not have violations with tooltips (theme: %s )', async (_, currentTheme) => {
    const { container } = renderWithTheme(<Button tooltip="toto">Hello</Button>, currentTheme)

    await expectNoViolations(container)
  })
})
