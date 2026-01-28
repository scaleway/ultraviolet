import './vanilla/globalStyle.css'

export type { ExtendedColor, TextStyleObject, TextVariant } from './constants'
export { textVariants } from './constants'
export { isColorMonochrome, isSize } from './helpers'
export { ThemeProvider, useTheme } from './ThemeProvider'
export * from './themes'
export { theme } from './vanilla/themes.css'
