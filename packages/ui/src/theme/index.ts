import { consoleDarkTheme, consoleLightTheme } from '@scaleway/themes'
import deepmerge from 'deepmerge'

export type Spaces = keyof typeof consoleLightTheme.space

export type ScreenSize = keyof typeof consoleLightTheme.screens

type SCWUITheme = typeof consoleLightTheme

const { colors, shadows, typography, space, radii, screens } = consoleLightTheme

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

/**
 * Will extend theme with new theme properties
 * @param {SCWUITheme} baseTheme the theme you want to extend from, by default it is set to light theme
 * @param {RecursivePartial<SCWUITheme>} extendedTheme the properties of a new theme you want to apply from baseTheme
 */
const extendTheme = (extendedTheme: RecursivePartial<SCWUITheme>) =>
  deepmerge(consoleLightTheme, extendedTheme) as SCWUITheme

// This type exclude overlay and secondary color
type Color = Extract<
  keyof typeof consoleLightTheme.colors,
  'primary' | 'neutral' | 'success' | 'danger' | 'warning' | 'info'
>

const SENTIMENTS = Object.keys(colors).filter(
  sentiment => sentiment !== 'overlay' && sentiment !== 'secondary',
) as Color[]

const SENTIMENTS_WITHOUT_NEUTRAL = Object.keys(colors).filter(
  sentiment =>
    sentiment !== 'overlay' &&
    sentiment !== 'secondary' &&
    sentiment !== 'neutral',
) as Exclude<Color, 'neutral'>[]

export type { SCWUITheme, Color }

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
}

export default consoleLightTheme
