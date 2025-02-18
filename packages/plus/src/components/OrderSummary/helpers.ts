import { multiplier } from './constants'
import type { TimeUnit } from './types'

export const formatNumber = (
  number: number,
  locale: string,
  currency: string,
) => {
  const numberFormat = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })

  return numberFormat.format(number)
}

// time unit = hours, days, months
// timeAmount = number of hours / days / months
export const calculatePrice = (
  price: number,
  amount: number,
  amountFree = 0,
  timeUnit: TimeUnit,
  timeAmount: number,
  discount = 0,
) => {
  const nonNanTimeAmount = Number.isNaN(timeAmount) ? 1 : timeAmount
  const value =
    (price - price * discount) *
    (nonNanTimeAmount * multiplier[`${timeUnit}`]) *
    Math.max(amount - amountFree, 0)

  return value
}
