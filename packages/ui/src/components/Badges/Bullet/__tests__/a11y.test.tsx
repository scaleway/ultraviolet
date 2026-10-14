import { screen } from '@testing-library/react'
import { MoonIcon } from '@ultraviolet/icons/MoonIcon'
import { consoleThemesMap } from '@ultraviolet/themes'
import { expectNoViolations, renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Bullet } from '..'

describe('bullet - A11y', { tags: ['a11y'] }, () => {
  describe('axe checks', () => {
    it.for([...consoleThemesMap.entries()])(
      'text bullet should not have violations (theme: %s)',
      async ([, currentTheme]) => {
        const { container } = renderWithTheme(<Bullet>1</Bullet>, currentTheme)
        await expectNoViolations(container)
      },
    )

    it.for([...consoleThemesMap.entries()])(
      'decorative icon bullet hidden with aria-hidden should not have violations (theme: %s)',
      async ([, currentTheme]) => {
        const { container } = renderWithTheme(
          <Bullet aria-hidden>
            <MoonIcon />
          </Bullet>,
          currentTheme,
        )
        await expectNoViolations(container)
      },
    )
  })

  describe('decorative content (WCAG 1.1.1)', () => {
    it('forwards aria-hidden to the bullet element', () => {
      renderWithTheme(
        <Bullet data-testid="bullet" aria-hidden>
          <MoonIcon />
        </Bullet>,
      )

      expect(screen.getByTestId('bullet')).toHaveAttribute('aria-hidden', 'true')
    })

    it('does not set aria-hidden by default', () => {
      const { container } = renderWithTheme(<Bullet>1</Bullet>)

      expect(container.querySelector('[aria-hidden]')).not.toBeInTheDocument()
    })
  })
})
