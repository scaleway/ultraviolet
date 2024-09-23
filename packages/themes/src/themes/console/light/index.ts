import deepmerge from 'deepmerge'
import { deprecatedLightTokens } from '../deprecated/light'
import { lightTheme } from './__generated__'

export const consoleLightTheme: typeof lightTheme &
  typeof deprecatedLightTokens = deepmerge(lightTheme, deprecatedLightTokens)
