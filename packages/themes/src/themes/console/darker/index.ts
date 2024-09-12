import deepmerge from 'deepmerge'
import { deprecatedDarkerTokens } from '../deprecated/darker'
import { darkerTheme } from './__generated__'

export const consoleDarkerTheme = deepmerge(
  darkerTheme,
  deprecatedDarkerTokens,
) as typeof darkerTheme & typeof deprecatedDarkerTokens
