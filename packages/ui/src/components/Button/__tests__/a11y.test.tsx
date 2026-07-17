import { render } from '@testing-library/react'
import { PencilIcon } from '@ultraviolet/icons/PencilIcon'
import { ThemeProvider, consoleThemesMap } from '@ultraviolet/themes'
import type { consoleLightTheme } from '@ultraviolet/themes'
import axe from 'axe-core'
import { describe, it, expect } from 'vitest'
import { Button } from '..'

const renderWithTheme = (ui: React.ReactElement, theme: typeof consoleLightTheme) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('button - A11y', () => {
  it.for([...consoleThemesMap.entries()])('should not have violations with (theme: %s)', async ([, currentTheme]) => {
    const { container } = renderWithTheme(
      <Button disabled onClick={() => {}}>
        <PencilIcon />
        Hello
      </Button>,
      currentTheme,
    )

    const results = await axe.run(container)
    expect(results).toHaveNoViolations()
  })

  it.for([...consoleThemesMap.entries()])(
    'should not have violations with tooltips (theme: %s)',
    async ([, currentTheme]) => {
      const { container } = renderWithTheme(<Button tooltip="toto">Hello</Button>, currentTheme)

      const results = await axe.run(container)
      expect(results).toHaveNoViolations()
    },
  )
})
