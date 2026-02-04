import { lightTheme } from './themes/console/light/__generated__/index'

type Colors = typeof lightTheme.colors
type Typography = typeof lightTheme.typography
type Sizing = typeof lightTheme.sizing

export const { colors } = lightTheme
export const { typography } = lightTheme
export const { sizing } = lightTheme

// This type exclude overlay | other color
export type Color = Extract<
  keyof typeof colors,
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
>

export type Monochrome = keyof typeof colors.other.monochrome

export type Sizes = keyof typeof sizing
export type ExtendedColor = Color | Monochrome

export type TextVariant = keyof typeof typography
export type TextStyleObject = typeof typography.body
export const textVariants = Object.keys(typography) as TextVariant[]
