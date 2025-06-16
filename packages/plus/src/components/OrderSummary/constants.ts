import type { TimeUnit } from './types'

export const Units = [
  'seconds',
  'minutes',
  'hours',
  'days',
  'months',
] satisfies TimeUnit[]

// As we base ou calculation on hours we need to multiply them by a multiplier
// 1 month = 730 hours
export const multiplier: Record<(typeof Units)[number], number> = {
  seconds: 1 / 60 / 60,
  minutes: 1 / 60,
  hours: 1,
  days: 24,
  months: 730,
} as const
