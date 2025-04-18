import { consoleDarkTheme, consoleLightTheme } from '@ultraviolet/themes'
import deepmerge from 'deepmerge'
import ThemeRegistry from './ThemeRegistry'

export type ScreenSize = keyof typeof consoleLightTheme.screens

/**
 * @deprecated use UltravioletUITheme instead
 */
type SCWUITheme = typeof consoleLightTheme
type UltravioletUITheme = typeof consoleLightTheme

const { colors, shadows, typography, space, radii, screens } = consoleLightTheme

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

/**
 * Will extend theme with new theme properties
 * @param {UltravioletUITheme} baseTheme the theme you want to extend from, by default it is set to light theme
 * @param {RecursivePartial<UltravioletUITheme>} extendedTheme the properties of a new theme you want to apply from baseTheme
 */
const extendTheme = (extendedTheme: RecursivePartial<UltravioletUITheme>) =>
  deepmerge(consoleLightTheme, extendedTheme) as UltravioletUITheme

// This type exclude overlay color
type Color = Extract<
  keyof typeof consoleLightTheme.colors,
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
>

type ExtendedColor = Color | 'white' | 'black'

const SENTIMENTS = [
  'primary',
  'secondary',
  'neutral',
  'success',
  'danger',
  'warning',
  'info',
] as const

const SENTIMENTS_WITHOUT_NEUTRAL = SENTIMENTS.filter(
  sentiment => sentiment !== 'neutral',
)

export type { SCWUITheme, UltravioletUITheme, Color, ExtendedColor }

export {
  colors,
  shadows,
  space,
  radii,
  screens,
  consoleDarkTheme as darkTheme,
  extendTheme,
  SENTIMENTS,
  SENTIMENTS_WITHOUT_NEUTRAL,
  typography,
  ThemeRegistry,
}

export default consoleLightTheme
