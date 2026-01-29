import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { consoleLightTheme } from '../themes'
import { theme as themeContract } from '../vanilla/themes.css'

export const generateObjectStyleFromTheme = (
  theme: typeof consoleLightTheme,
) => {
  const cssVars = assignInlineVars(themeContract, theme)
  const cssString = `:root { ${Object.entries(cssVars)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ')} }`

  return cssString
}
