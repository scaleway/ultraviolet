import { describe, expect, it } from 'vitest'
import { consoleDarkTheme, consoleLightTheme } from '../themes'
import { generateObjectStyleFromTheme } from './generateObjectStyleFromTheme'

describe(generateObjectStyleFromTheme, () => {
  it('generates a :root stylesheet from the theme', () => {
    const style = generateObjectStyleFromTheme(consoleLightTheme)

    expect(style.startsWith(':root {')).toBe(true)
    expect(style.endsWith('}')).toBe(true)
  })

  it('maps the theme tokens to their CSS custom properties', () => {
    expect(generateObjectStyleFromTheme(consoleLightTheme)).toContain(
      `--color-primary-background: ${consoleLightTheme.colors.primary.background};`,
    )
  })

  it('reflects the values of the given theme', () => {
    const style = generateObjectStyleFromTheme(consoleDarkTheme)

    expect(style).toContain(`--color-primary-background: ${consoleDarkTheme.colors.primary.background};`)
    expect(style).not.toContain(`--color-primary-background: ${consoleLightTheme.colors.primary.background};`)
  })
})
