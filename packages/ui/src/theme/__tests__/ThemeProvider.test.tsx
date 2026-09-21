import { render } from '@testing-library/react'
import { ThemeProvider } from '@ultraviolet/themes'
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
  })
})
