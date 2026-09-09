import { consoleThemesMap } from '@ultraviolet/themes'
import { expectNoViolations, renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { ContentCardGroup } from '..'

describe('contentCardGroup - A11y', { tags: ['a11y'] }, () => {
  describe('axe checks', () => {
    it.for([...consoleThemesMap.entries()])('should not have violations (theme: %s)', async ([, currentTheme]) => {
      const { container } = renderWithTheme(
        <ContentCardGroup>
          <ContentCardGroup.Card description="description" href="http://scaleway.com" subtitle="subtitle" title="title">
            <div>test</div>
          </ContentCardGroup.Card>
        </ContentCardGroup>,
        currentTheme,
      )
      await expectNoViolations(container)
    })
  })

  it('exposes the card title as the link accessible name', () => {
    const { container } = renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" title="My card title" />
      </ContentCardGroup>,
    )
    expect(container.querySelector('a')).toHaveAccessibleName('My card title')
  })
})
