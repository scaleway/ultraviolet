import deepmerge from 'deepmerge'
import { deprecatedDarkTokens } from '../deprecated/dark'
import { darkTheme } from './__generated__'

export const consoleDarkTheme: typeof darkTheme & typeof deprecatedDarkTokens =
  deepmerge(darkTheme, deprecatedDarkTokens)
