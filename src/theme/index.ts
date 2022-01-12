import colors, { colorsTokens } from './colors'
import type { Color, ContrastType } from './colors'
import colorsDeprecated from './deprecated/colors'

/* eslint-disable sort-keys */
const radii = {
  none: '0',
  default: '4px',
  large: '8px',
}

const space = {
  0: '0',
  0.25: '2px',
  0.5: '4px',
  0.75: '6px',
  1: '8px',
  2: '16px',
  2.25: '18px',
  3: '24px',
  4: '32px',
  5: '40px',
  6: '48px',
  7: '56px',
  8: '64px',
  9: '72px',
}
export type Spaces = keyof typeof space

const screens = {
  xsmall: 0,
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
}
export type ScreenSize = keyof typeof screens

const fonts = {
  monospace: "'Lucida Console', Monaco, 'Courier New', Courier, monospace",
  sansSerif: 'Asap, System, sans-serif',
}

const theme = {
  colorsDeprecated,
  colors,
  fonts,
  space,
  screens,
  radii,
}
/* eslint-enable sort-keys */

const createTheme = ({
  contrasts,
  space: newSpace,
  screens: newScreens,
  radii: newRadii,
  fonts: newFonts,
}: {
  contrasts?: Partial<Record<Color, Partial<ContrastType>>>
  space?: Partial<Record<Spaces, string>>
  screens?: Partial<Record<ScreenSize, number>>
  radii?: Partial<Record<keyof typeof radii, string>>
  fonts?: Partial<Record<keyof typeof fonts, string>>
}): SCWUITheme => ({
  ...theme,
  ...(contrasts ? { colors: { ...colors, ...colorsTokens(contrasts) } } : {}),
  ...(newSpace ? { space: { ...space, ...newSpace } } : { space }),
  ...(newScreens ? { screens: { ...screens, ...newScreens } } : { screens }),
  ...(newRadii ? { radii: { ...radii, ...newRadii } } : { radii }),
  ...(newFonts ? { fonts: { ...fonts, ...newFonts } } : { fonts }),
})

type SCWUITheme = typeof theme & {
  linkComponent?: unknown
}

export default theme

export type { Color, SCWUITheme }

export { colors, colorsDeprecated, space, radii, fonts, screens, createTheme }
