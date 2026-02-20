import type { Units } from './types'

export const APPROXIMATE_HOURS_IN_MONTH = 730

// As we base ou calculation on hours we need to multiply them by a multiplier
// 1 month = 730 hours
export const multiplier: Record<Units, number> = {
  days: 24,
  hours: 1,
  minutes: 1 / 60,
  months: APPROXIMATE_HOURS_IN_MONTH,
  seconds: 1 / 60 / 60,
} as const

// This is used to tell how many decimals depending on time unit
// "hours": 5 === 5 decimals on hour unit
export const maximumFractionDigits: Record<Units, number> = {
  days: 3,
  hours: 5,
  minutes: 8,
  months: 2,
  seconds: 10,
} as const

export const maximumFractionDigitsLong: Record<Units, number> = {
  days: 4,
  hours: 8,
  minutes: 10,
  months: 2,
  seconds: 12,
} as const

export const MAX_CELL_WIDTH = '70%'
export const PRICE_MAX_CELL_WIDTH = '30%'
