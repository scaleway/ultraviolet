import { multiplier } from './constants'
import type { Units } from './types'

// time unit = hours, days, months
// timeAmount = number of hours / days / months
export const calculatePrice = ({
  price,
  amount,
  amountFree = 0,
  timeUnit,
  timeAmount,
  discount = 0,
}: {
  price: number
  amount: number
  amountFree?: number
  timeUnit: Units
  timeAmount: number
  discount?: number
}) => {
  const nonNanTimeAmount = Number.isNaN(timeAmount) ? 0 : timeAmount
  const value =
    (price - price * discount) *
    (nonNanTimeAmount * multiplier[timeUnit]) *
    Math.max(amount - amountFree, 0)

  return value
}
