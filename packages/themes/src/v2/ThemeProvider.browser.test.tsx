import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from './ThemeProvider'

describe('theme provider', () => {
  it('applies light theme CSS custom properties to :root ', () => {
    const { getByText } = render(
      <ThemeProvider initialTheme="light">
        <p>Themed content</p>
      </ThemeProvider>,
    )

    expect(getByText('Themed content')).toBeInTheDocument()

    expect(document.documentElement.classList[0]).toBe(`light-theme`)
  })

  it('applies dark theme CSS custom properties to :root ', () => {
    const { getByText } = render(
      <ThemeProvider initialTheme="dark">
        <p>Themed content</p>
      </ThemeProvider>,
    )

    expect(getByText('Themed content')).toBeInTheDocument()

    expect(document.documentElement.classList[0]).toBe(`dark-theme`)
  })

  it('applies darker theme CSS custom properties to :root ', () => {
    const { getByText } = render(
      <ThemeProvider initialTheme="darker">
        <p>Themed content</p>
      </ThemeProvider>,
    )

    expect(getByText('Themed content')).toBeInTheDocument()

    expect(document.documentElement.classList[0]).toBe(`darker-theme`)
  })

  it('applies system theme CSS custom properties to :root ', () => {
    const { getByText } = render(
      <ThemeProvider initialTheme="system">
        <p>Themed content</p>
      </ThemeProvider>,
    )

    expect(getByText('Themed content')).toBeInTheDocument()

    // will depends of the initial setup of the browser
    expect(document.documentElement.classList[0]).toBe(`light-theme`)
  })
})
