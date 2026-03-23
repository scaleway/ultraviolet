import { assignInlineVars } from '@vanilla-extract/dynamic'

import { theme as themeContract } from '../vanilla/themes.css'

import type { consoleLightTheme } from '../themes'

export const generateObjectStyleFromTheme = (
  theme: typeof consoleLightTheme,
) => {
  const cssVars = assignInlineVars(themeContract, theme)
  const cssString = `:root { ${Object.entries(cssVars)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ')} }`

  return cssString
}
