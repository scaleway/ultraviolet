import {
  consoleDarkerTheme,
  consoleDarkTheme,
  consoleLightTheme,
  useTheme,
} from '@ultraviolet/themes'
import deepmerge from 'deepmerge'
import { ThemeProvider } from './ThemeProvider'

export type ScreenSize = keyof typeof consoleLightTheme.breakpoints

type UltravioletUITheme = typeof consoleLightTheme

const { colors, shadows, typography, space, radii, breakpoints } =
  consoleLightTheme

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

export type { UltravioletUITheme, Color, ExtendedColor }

export {
  colors,
  shadows,
  space,
  radii,
  breakpoints as screens,
  consoleDarkTheme as darkTheme,
  consoleDarkerTheme as darkerTheme,
  extendTheme,
  SENTIMENTS,
  SENTIMENTS_WITHOUT_NEUTRAL,
  typography,
  ThemeProvider,
  useTheme,
}

export default consoleLightTheme
