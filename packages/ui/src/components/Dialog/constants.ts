import type { SENTIMENTS } from '../../theme'

export const DIALOG_SENTIMENTS = [
  'primary',
  'success',
  'warning',
  'danger',
] satisfies (typeof SENTIMENTS)[number][]
export type DialogSentiment = (typeof DIALOG_SENTIMENTS)[number]
