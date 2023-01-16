import { maxDateValidator } from '../maxDate'

const today = new Date()
const hourInMs = 60 * 60 * 1000
const twoHoursLater = new Date(today.getTime() + 2 * hourInMs)
const yesterday = new Date(today.getTime() - 24 * hourInMs)
const tomorrow = new Date(today.getTime() + 24 * hourInMs)

describe('maxDate validator', () => {
  test('should not throw error', () => {
    const validator = maxDateValidator(tomorrow)
    expect(validator).toBeDefined()
    expect(validator.error).toBe('MAX_DATE')
  })

  test('should success', () => {
    const validator = maxDateValidator(yesterday)
    expect(validator.validate(today, {})).toBe(false)
    expect(validator.validate(twoHoursLater, {})).toBe(false)
    expect(validator.validate(tomorrow, {})).toBe(false)
  })

  test('should failed', () => {
    const validator = maxDateValidator(tomorrow)
    expect(validator.validate(yesterday, {})).toBe(true)
    expect(validator.validate(today, {})).toBe(true)
    expect(validator.validate(twoHoursLater, {})).toBe(true)
  })
})
