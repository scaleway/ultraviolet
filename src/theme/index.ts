/* eslint-disable sort-keys */
import colors, { Color, ContrastType, colorsTokens } from './colors'
import colorsDeprecated from './deprecated/colors'

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
} as const
export type Spaces = keyof typeof space

const screens = {
  xsmall: 0,
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
} as const
export type ScreenSize = keyof typeof screens

const fonts = {
  monospace: "'Lucida Console', Monaco, 'Courier New', Courier, monospace",
  sansSerif: 'Asap, System, sans-serif',
} as const

const theme = {
  colorsDeprecated,
  colors,
  fonts,
  space,
  screens,
  radii,
}

const createTheme = ({
  contrasts,
  space: newSpace,
  screens: newScreens,
  radii: newRadii,
  fonts: newFonts,
}: {
  contrasts?: Record<Color, Partial<ContrastType>>
  space?: Spaces
  screens?: ScreenSize
  radii?: Record<string, string>
  fonts?: Record<string, string>
}) => ({
  ...theme,
  ...(contrasts ? { colors: colorsTokens(contrasts) } : {}),
  ...(newSpace ? { space: newSpace } : {}),
  ...(newScreens ? { screen: newScreens } : {}),
  ...(newRadii ? { radii: newRadii } : {}),
  ...(newFonts ? { fonts: newFonts } : {}),
})

type SCWUITheme = typeof theme & {
  linkComponent?: unknown
}

export default theme

export {
  colors,
  colorsDeprecated,
  space,
  radii,
  fonts,
  screens,
  SCWUITheme,
  createTheme,
}
