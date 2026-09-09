export const PROMINENCE_VALUES = ['default', 'strong'] as const
export type ProminenceType = 'default' | 'strong'

export const SENTIMENTS = ['primary', 'info', 'success', 'warning', 'danger', 'neutral'] as const
export type LinkSentiment = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral'

export const PROMINENCES: Record<ProminenceType, '' | 'strong'> = {
  default: '',
  strong: 'strong',
}
