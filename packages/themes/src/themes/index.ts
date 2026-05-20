import { darkTheme as consoleDarkTheme } from './console/dark/__generated__'
import { darkerTheme as consoleDarkerTheme } from './console/darker/__generated__'
import { lightTheme as consoleLightTheme } from './console/light/__generated__'

type ThemeName = 'consoleLightTheme' | 'consoleDarkTheme' | 'consoleDarkerTheme'

export const consoleMapThemes = new Map<ThemeName, typeof consoleLightTheme>([
  ['consoleLightTheme', consoleLightTheme],
  ['consoleDarkTheme', consoleDarkTheme],
  ['consoleDarkerTheme', consoleDarkerTheme],
])

export { consoleDarkTheme, consoleDarkerTheme, consoleLightTheme }
