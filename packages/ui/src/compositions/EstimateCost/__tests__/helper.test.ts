import { describe, expect, it } from 'vitest'
import { calculatePrice } from '../helper'

describe('estimateCost - helper', () => {
  it('should calculate price of 0, amount 0, amountFree 0 for 24 hours', () => {
    expect(
      calculatePrice({
        amount: 0,
        price: 0,
        timeAmount: 24,
        timeUnit: 'hours',
      }),
    ).toBe(0)
  })

  it('should calculate negative price of -1, amount 1, amountFree 0 for 24 hours', () => {
    expect(
      calculatePrice({
        amount: 1,
        price: -1,
        timeAmount: 24,
        timeUnit: 'hours',
      }),
    ).toBe(-24)
  })

  it('should calculate price of 0.004, amount 5, amountFree 2 for 3 months', () => {
    expect(
      calculatePrice({
        amount: 5,
        amountFree: 2,
        price: 0.0014,
        timeAmount: 3,
        timeUnit: 'months',
      }),
    ).toStrictEqual(9.198)
  })

  it('should calculate work with NaN timeAmount number', () => {
    expect(
      calculatePrice({
        amount: 5,
        amountFree: 2,
        price: 0.0014,
        timeAmount: Number.NaN,
        timeUnit: 'months',
      }),
    ).toBe(0)
  })
})
