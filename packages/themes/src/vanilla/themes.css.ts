import { createGlobalThemeContract } from '@vanilla-extract/css'
import { consoleLightTheme } from '../themes'

// Maps each top-level theme section to the CSS custom property prefix used by
// the static CSS files generated in `utils/scripts/figma-synchronise-token`.
// This keeps the vanilla-extract contract in sync with the static CSS variables
// (e.g. `--color-danger-background`, `--space-0`) so components can consume
// them without any runtime injection.
const prefixMap: Record<string, string> = {
  breakpoints: 'breakpoint',
  colors: 'color',
  radii: 'radius',
  shadows: 'shadow',
  sizing: 'sizing',
  space: 'space',
  typography: 'typography',
  theme: 'theme',
}

const toKebabCase = (key: string) => key.replaceAll('.', '-').replaceAll(/[A-Z]/gu, match => `-${match.toLowerCase()}`)

// Theme contract that will defines all CSS variables used in the application
// Variable names are readable and match the static CSS files
export const theme = createGlobalThemeContract(consoleLightTheme, (_value, path) => {
  const [first, ...rest] = path
  const suffix = rest.map(toKebabCase).join('-')
  return `${prefixMap[first] ?? first}${suffix.length > 0 ? `-${suffix}` : ''}`
})
