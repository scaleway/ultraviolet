import { createGlobalTheme, createGlobalThemeContract, createTheme, globalStyle } from '@vanilla-extract/css'
import { consoleDarkTheme, consoleDarkerTheme, consoleLightTheme } from '../themes'

// Maps top-level theme keys (plural) to their CSS variable prefixes (singular).
// The theme object uses `colors`, `radii`, `shadows`, `breakpoints` but the
// static CSS variables use `color`, `radius`, `shadow`, `breakpoint`.
const PREFIX_MAP: Record<string, string> = {
  colors: 'color',
  radii: 'radius',
  shadows: 'shadow',
  breakpoints: 'breakpoint',
}

const toKebabCase = (str: string) =>
  str
    .replace(/([A-Z])/gu, '-$1')
    .replace(/\./gu, '-')
    .toLowerCase()

/**
 * Theme contract with human-readable CSS variable names.
 *
 * Instead of hashed names like `--uv_theme_rwwhsl6`, variables are named
 * `--color-danger-background`, `--space-0`, `--typography-body-font-size`, etc.
 *
 * This matches the names used in the static CSS files (`light.css`, `dark.css`,
 * `darker.css`), so the values can be provided by static CSS instead of
 * runtime injection.
 *
 * `theme.space[0]` → `var(--space-0)`
 * `theme.colors.info.text` → `var(--color-info-text)`
 */
export const theme = createGlobalThemeContract(consoleLightTheme, (_value, path) => {
  const mappedPath = path.map((p, i) => (i === 0 ? (PREFIX_MAP[p] ?? toKebabCase(p)) : toKebabCase(p)))

  return `--${mappedPath.join('-')}`
})

// Static CSS theme classes for scoped theming (e.g. a dark panel in a light app).
export const lightThemeClass = createTheme(theme, consoleLightTheme)
export const darkThemeClass = createTheme(theme, consoleDarkTheme)
export const darkerThemeClass = createTheme(theme, consoleDarkerTheme)

// Global theme definitions for CSS-only theme switching.
// Light is the default on `:root` (no class needed).
// `dark-theme` and `darker-theme` override it when present on `<html>`.
createGlobalTheme(':root', theme, consoleLightTheme)
createGlobalTheme(':root.dark-theme', theme, consoleDarkTheme)
createGlobalTheme(':root.darker-theme', theme, consoleDarkerTheme)

// Apply default body colors using the theme contract variables.
globalStyle('body', {
  color: theme.colors.neutral.text,
  backgroundColor: theme.colors.neutral.background,
})
