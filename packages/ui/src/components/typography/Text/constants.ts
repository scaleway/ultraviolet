export const PROMINENCES = {
  default: '',
  strong: 'strong',
  stronger: 'stronger',
  weak: 'weak',
} as const

export type Prominence = keyof typeof PROMINENCES

export const PROMINENCE_ARRAY = Object.keys(PROMINENCES) as readonly Prominence[]
