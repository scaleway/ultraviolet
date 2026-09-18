import { render } from '@testing-library/react'
import { consoleDarkTheme, consoleLightTheme, ThemeProvider } from '@ultraviolet/themes'
import { describe, expect, it } from 'vitest'

const getInjectedStyle = (id = 'uv-theme') => document.getElementById(id)

describe('themeProvider', () => {
  it('injects a style tag with the theme variables with default props', () => {
    render(
      <ThemeProvider>
        <div>child</div>
      </ThemeProvider>,
    )

    const style = getInjectedStyle()
    expect(style).not.toBeNull()
    expect(style?.tagName).toBe('STYLE')
    expect(style?.textContent).toContain(':root')
    expect(style?.textContent).toContain('background-color')
    expect(style?.textContent).toContain('color')
    expect(style?.textContent).not.toContain('@layer')
  })

  it('applies the theme background color to the body', () => {
    render(
      <ThemeProvider theme={consoleLightTheme}>
        <div>child</div>
      </ThemeProvider>,
    )

    const style = getInjectedStyle()
    expect(style?.textContent).toContain(`background-color: ${consoleLightTheme.colors.neutral.background}`)
  })

  it('updates the injected styles when the theme changes', () => {
    const { rerender } = render(
      <ThemeProvider theme={consoleLightTheme}>
        <div>child</div>
      </ThemeProvider>,
    )
    const style = getInjectedStyle()
    expect(style?.textContent).toContain(`background-color: ${consoleLightTheme.colors.neutral.background}`)

    rerender(
      <ThemeProvider theme={consoleDarkTheme}>
        <div>child</div>
      </ThemeProvider>,
    )

    const newStyle = getInjectedStyle()
    expect(newStyle?.textContent).toContain(`background-color: ${consoleDarkTheme.colors.neutral.background}`)
    expect(newStyle?.textContent).not.toContain(`background-color: ${consoleLightTheme.colors.neutral.background}`)
  })
})
