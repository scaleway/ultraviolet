import { consoleThemesMap } from '@ultraviolet/themes'
import { expectNoViolations, renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { ContentCard } from '..'
import illustration from '../assets/illustration.png'

describe('contentCard - A11y', { tags: ['a11y'] }, () => {
  describe('axe checks', () => {
    it.for([...consoleThemesMap.entries()])('should not have violations (theme: %s)', async ([, currentTheme]) => {
      const { container } = renderWithTheme(
        <ContentCard
          description="this is a description"
          href="https://scaleway.com"
          icon={<img alt="" src={illustration} />}
          image={illustration}
          subtitle="sub title test"
          title="test"
        >
          <div>extra content</div>
        </ContentCard>,
        currentTheme,
      )
      await expectNoViolations(container)
    })
  })

  it('hides the decorative image from assistive technology', () => {
    const { container } = renderWithTheme(<ContentCard image={illustration} title="test" />)
    expect(container.querySelector('img')).toHaveAttribute('alt', '')
  })
})
