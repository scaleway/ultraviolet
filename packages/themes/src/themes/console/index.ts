import { darkTheme } from './dark'
import { lightTheme } from './light'

const radii = {
  none: '0',
  small: '1px',
  default: '4px',
  large: '8px',
  circle: '100%',
}

const space = {
  0: '0',
  0.25: '2px',
  0.5: '4px',
  0.75: '6px',
  1: '8px',
  2: '16px',
  2.25: '18px',
  3: '24px',
  4: '32px',
  5: '40px',
  6: '48px',
  7: '56px',
  8: '64px',
  9: '72px',
}

const screens = {
  xsmall: 0,
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
}

export const consoleLightTheme = {
  radii,
  space,
  screens,
  ...lightTheme,
}

export const consoleDarkTheme = {
  radii,
  space,
  screens,
  ...darkTheme,
}
