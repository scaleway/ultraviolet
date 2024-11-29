import { describe, expect, it } from 'vitest'
import { calculatePrice } from '../helper'

describe('EstimateCost - helper', () => {
  it('should calculate price of 0, amount 0, amountFree 0 for 24 hours', () => {
    expect(
      calculatePrice({
        price: 0,
        amount: 0,
        timeUnit: 'hours',
        timeAmount: 24,
      }),
    ).toEqual(0)
  })

  it('should calculate negative price of -1, amount 1, amountFree 0 for 24 hours', () => {
    expect(
      calculatePrice({
        price: -1,
        amount: 1,
        timeUnit: 'hours',
        timeAmount: 24,
      }),
    ).toEqual(-24)
  })

  it('should calculate price of 0.004, amount 5, amountFree 2 for 3 months', () => {
    expect(
      calculatePrice({
        price: 0.0014,
        amount: 5,
        amountFree: 2,
        timeUnit: 'months',
        timeAmount: 3,
      }),
    ).toEqual(9.198)
  })

  it('should calculate work with NaN timeAmount number', () => {
    expect(
      calculatePrice({
        price: 0.0014,
        amount: 5,
        amountFree: 2,
        timeUnit: 'months',
        timeAmount: Number.NaN,
      }),
    ).toEqual(0)
  })
})
