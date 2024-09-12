import deepmerge from 'deepmerge'
import { deprecatedDarkTokens } from '../deprecated/dark'
import { darkTheme } from './__generated__'

export const consoleDarkTheme = deepmerge(
  darkTheme,
  deprecatedDarkTokens,
) as typeof darkTheme & typeof deprecatedDarkTokens
