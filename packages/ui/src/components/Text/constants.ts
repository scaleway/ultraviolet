import type { TextVariant } from '@ultraviolet/themes'
import { consoleLightTheme } from '@ultraviolet/themes'

const { typography } = consoleLightTheme

export const PROMINENCES = {
  default: '',
  strong: 'strong',
  stronger: 'stronger',
  weak: 'weak',
} as const

export const textVariants = Object.keys(typography) as TextVariant[]
