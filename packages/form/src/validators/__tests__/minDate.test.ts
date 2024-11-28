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
    expect(validator(today)).toBeFalsy()
    expect(validator(twoHoursLater)).toBeFalsy()
    expect(validator(yesterday)).toBeFalsy()
  })

  test('should validate the input', () => {
    const validator = minDateValidator(yesterday)
    expect(validator(today)).toBeTruthy()
    expect(validator(tomorrow)).toBeTruthy()
    expect(validator(twoHoursLater)).toBeTruthy()
  })
})
