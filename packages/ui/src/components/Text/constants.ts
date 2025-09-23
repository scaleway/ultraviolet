import { typography } from '../../theme'

export const PROMINENCES = {
  default: '',
  strong: 'strong',
  stronger: 'stronger',
  weak: 'weak',
}

export type TextVariant = keyof typeof typography

export const textVariants = Object.keys(typography) as TextVariant[]
