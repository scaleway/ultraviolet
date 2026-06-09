export const PROMINENCE_VALUES = ['default', 'strong', 'stronger', 'weak'] as const
export type ProminenceType = (typeof PROMINENCE_VALUES)[number]

export const PROMINENCES: Record<ProminenceType, '' | 'strong'> = {
  default: '',
  strong: 'strong',
  stronger: 'strong',
  weak: '',
}
