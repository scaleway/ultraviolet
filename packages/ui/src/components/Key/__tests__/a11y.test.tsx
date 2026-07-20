import { render } from '@testing-library/react'
import { ThemeProvider, consoleThemesMap } from '@ultraviolet/themes'
import type { consoleLightTheme } from '@ultraviolet/themes'
import axe from 'axe-core'
import { describe, it, expect } from 'vitest'
import { Key } from '..'

const renderWithTheme = (ui: React.ReactElement, theme: typeof consoleLightTheme) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('key - A11y', () => {
  it.for([...consoleThemesMap.entries()])(
    'should not have violations with strong prominence (theme: %s)',
    async ([themeName, currentTheme]) => {
      const { container } = renderWithTheme(<Key prominence="strong">{themeName}</Key>, currentTheme)

      const results = await axe.run(container)
      expect(results).toHaveNoViolations()
    },
  )

  it.for([...consoleThemesMap.entries()])(
    'should not have violations with primary sentiment (theme: %s)',
    async ([themeName, currentTheme]) => {
      const { container } = renderWithTheme(
        <Key sentiment="primary" prominence="strong">
          {themeName}
        </Key>,
        currentTheme,
      )

      const results = await axe.run(container)
      expect(results).toHaveNoViolations()
    },
  )

  it.for([...consoleThemesMap.entries()])(
    'should not have violations when disabled (theme: %s)',
    async ([themeName, currentTheme]) => {
      const { container } = renderWithTheme(<Key disabled>{themeName}</Key>, currentTheme)

      const results = await axe.run(container)
      expect(results).toHaveNoViolations()
    },
  )

  it.for([...consoleThemesMap.entries()])(
    'should not have violations with small size (theme: %s)',
    async ([themeName, currentTheme]) => {
      const { container } = renderWithTheme(<Key size="small">{themeName}</Key>, currentTheme)

      const results = await axe.run(container)
      expect(results).toHaveNoViolations()
    },
  )
})
