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
  const value =
    (price - price * discount) *
    (timeAmount * multiplier[`${timeUnit}`]) *
    Math.max(amount - amountFree, 0)

  // Avoid having negative price in any cases
  if (value < 0) {
    return 0
  }

  return value
}
