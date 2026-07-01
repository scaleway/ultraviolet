import './vanilla/globalStyle.css'

export type { ExtendedColor, TextStyleObject, TextVariant, UltravioletUITheme } from './constants'
export { textVariants } from './constants'
export { generateObjectStyleFromTheme, isColorMonochrome, isSize } from './helpers'
export { ThemeProvider, useTheme } from './ThemeProvider'
export * from './themes'
export { theme } from './vanilla/themes.css'
export { extendTheme } from './extendTheme'
