import type { Units } from './types'

export const APPROXIMATE_HOURS_IN_MONTH = 730

// As we base ou calculation on hours we need to multiply them by a multiplier
// 1 month = 730 hours
export const multiplier: Record<Units, number> = {
  seconds: 1 / 60 / 60,
  minutes: 1 / 60,
  hours: 1,
  days: 24,
  months: APPROXIMATE_HOURS_IN_MONTH,
} as const

// This is used to tell how many decimals depending on time unit
// "hours": 5 === 5 decimals on hour unit
export const maximumFractionDigits: Record<Units, number> = {
  seconds: 10,
  minutes: 8,
  hours: 5,
  days: 3,
  months: 2,
} as const

export const maximumFractionDigitsLong: Record<Units, number> = {
  seconds: 12,
  minutes: 10,
  hours: 8,
  days: 4,
  months: 2,
} as const

export const MAX_CELL_WIDTH = '70%'
export const PRICE_MAX_CELL_WIDTH = '30%'
