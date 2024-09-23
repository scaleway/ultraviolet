import deepmerge from 'deepmerge'
import { deprecatedDarkerTokens } from '../deprecated/darker'
import { darkerTheme } from './__generated__'

export const consoleDarkerTheme: typeof darkerTheme &
  typeof deprecatedDarkerTokens = deepmerge(darkerTheme, deprecatedDarkerTokens)
