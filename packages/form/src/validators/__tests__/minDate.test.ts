import { describe, expect, test } from 'vitest'
import { minDateValidator } from '../minDate'

const today = new Date()
const hourInMs = 60 * 60 * 1000
const twoHoursLater = new Date(today.getTime() + 2 * hourInMs)
const yesterday = new Date(today.getTime() - 24 * hourInMs)
const tomorrow = new Date(today.getTime() + 24 * hourInMs)

describe('minDate validator', () => {
  test('should invalidate the input', () => {
    const validator = minDateValidator(tomorrow)
    expect(validator(today)).toBe(false)
    expect(validator(twoHoursLater)).toBe(false)
    expect(validator(yesterday)).toBe(false)
  })

  test('should validate the input', () => {
    const validator = minDateValidator(yesterday)
    expect(validator(today)).toBe(true)
    expect(validator(tomorrow)).toBe(true)
    expect(validator(twoHoursLater)).toBe(true)
  })
})
