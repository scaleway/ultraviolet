import deepmerge from 'deepmerge'
import { deprecatedLightTokens } from '../deprecated/light'
import { lightTheme } from './__generated__'

export const consoleLightTheme = deepmerge(
  lightTheme,
  deprecatedLightTokens,
) as typeof lightTheme & typeof deprecatedLightTokens
