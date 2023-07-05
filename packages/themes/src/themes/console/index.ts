import { darkTheme } from './dark'
import { darkerTheme } from './darker'
import { lightTheme } from './light'

const screens = {
  xsmall: 0,
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
}

export const consoleLightTheme = {
  screens,
  ...lightTheme,
}

export const consoleDarkTheme = {
  screens,
  ...darkTheme,
}

export const consoleDarkerTheme = {
  screens,
  ...darkerTheme,
}
