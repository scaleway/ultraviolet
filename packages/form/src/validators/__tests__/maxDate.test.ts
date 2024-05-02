import { describe, expect, test } from 'vitest'
import { maxDateValidator } from '../maxDate'

const today = new Date()
const hourInMs = 60 * 60 * 1000
const twoHoursLater = new Date(today.getTime() + 2 * hourInMs)
const yesterday = new Date(today.getTime() - 24 * hourInMs)
const tomorrow = new Date(today.getTime() + 24 * hourInMs)

describe('maxDate validator', () => {
  test('should success', () => {
    const validator = maxDateValidator(yesterday)
    expect(validator(today)).toBe(false)
    expect(validator(twoHoursLater)).toBe(false)
    expect(validator(tomorrow)).toBe(false)
  })

  test('should failed', () => {
    const validator = maxDateValidator(tomorrow)
    expect(validator(yesterday)).toBe(true)
    expect(validator(today)).toBe(true)
    expect(validator(twoHoursLater)).toBe(true)
  })
})
