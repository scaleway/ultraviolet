import minDate from '../minDate'

const today = new Date()
const hourInMs = 60 * 60 * 1000
const twoHoursLater = new Date(today.getTime() + 2 * hourInMs)
const yesterday = new Date(today.getTime() - 24 * hourInMs)
const tomorrow = new Date(today.getTime() + 24 * hourInMs)

describe('minDate validator', () => {
  test('should not throw error', () => {
    const validator = minDate(yesterday)
    expect(validator).toBeDefined()
    expect(validator.error).toBe('MIN_DATE')
  })

  test('should invalidate the input', () => {
    const validator = minDate(tomorrow)
    expect(validator.validate(today, {})).toBe(false)
    expect(validator.validate(twoHoursLater, {})).toBe(false)
    expect(validator.validate(yesterday, {})).toBe(false)
  })

  test('should validate the input', () => {
    const validator = minDate(yesterday)
    expect(validator.validate(today, {})).toBe(true)
    expect(validator.validate(tomorrow, {})).toBe(true)
    expect(validator.validate(twoHoursLater, {})).toBe(true)
  })
})
