import { lightTheme } from './themes/console/light/__generated__/index'

// This type exclude overlay color
export type Color = Extract<
  keyof typeof lightTheme.colors,
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
>

export type ExtendedColor = Color | 'white' | 'black'

const { typography } = lightTheme
export type TextVariant = keyof typeof lightTheme.typography
export const textVariants = Object.keys(typography) as TextVariant[]
