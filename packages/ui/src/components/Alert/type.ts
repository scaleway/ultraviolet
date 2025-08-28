export const ALERT_SENTIMENTS = [
  'danger',
  'info',
  'success',
  'warning',
  'neutral',
] as const

export type AlertSentiment = (typeof ALERT_SENTIMENTS)[number]
