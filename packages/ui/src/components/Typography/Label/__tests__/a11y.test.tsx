import { screen } from '@testing-library/react'
import { consoleThemesMap } from '@ultraviolet/themes'
import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Label } from '..'

describe('label - A11y', { tags: ['a11y'] }, () => {
  it.for([...consoleThemesMap.entries()])(
    'should not have violations with required prop (theme: %s)',
    async ([, currentTheme]) => {
      const { container } = renderWithTheme(<Label required>Label</Label>, currentTheme)
      await expectNoViolations(container)
    },
  )

  it('hides the required asterisk from assistive technologies and removes the dropped aria-label', () => {
    renderWithTheme(<Label required>Label</Label>)

    const asterisk = screen.getByText('*')
    expect(asterisk).toHaveAttribute('aria-hidden', 'true')
  })

  it('keeps the associated control accessible name free of the decorative asterisk', () => {
    renderWithTheme(
      <div>
        <Label htmlFor="test-input" required>
          Label
        </Label>
        <input id="test-input" />
      </div>,
    )

    expect(screen.getByRole('textbox')).toHaveAccessibleName('Label')
  })
})
