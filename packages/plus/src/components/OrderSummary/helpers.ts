import { multiplier } from './constants'
import type { TimeUnit } from './types'

export const formatNumber = (
  number: number,
  locale: string,
  currency: string,
  fractionDigits = 10,
) => {
  const numberFormat = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: fractionDigits,
  })

  return numberFormat.format(number)
}

// time unit = hours, days, months
// timeAmount = number of hours / days / months
// discount < 1: computed in % (price = price*discount)
// discount >= 1: computed in absolute value (price = price - discount)
export const calculatePrice = (
  price: number,
  amount: number,
  amountFree = 0,
  timeUnit: TimeUnit,
  timeAmount: number,
  discount = 0,
  fixedPrice = false,
) => {
  const nonNanTimeAmount = Number.isNaN(timeAmount) ? 1 : timeAmount
  const valueBeforeDiscount =
    price *
    (fixedPrice ? 1 : nonNanTimeAmount * multiplier[`${timeUnit}`]) *
    Math.max(amount - amountFree, 0)

  const finalValue =
    valueBeforeDiscount * (1 - (discount < 1 ? discount : 0)) -
    (discount >= 1 ? Math.abs(discount) : 0)

  return Math.max(finalValue, 0)
}
