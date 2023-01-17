import { minValidator } from '../min'

describe('min validator', () => {
  test('should not throw error', () => {
    const validator = minValidator(1)
    expect(validator).toBeDefined()
    expect(validator.error).toBe('TOO_LOW')
  })

  test('should success', () => {
    const validator = minValidator(1)
    expect(validator.validate(2, {})).toBe(true)
    expect(validator.validate(5, {})).toBe(true)
  })

  test('should failed', () => {
    const validator = minValidator(10)
    expect(validator.validate(1, {})).toBe(false)
    expect(validator.validate(9, {})).toBe(false)
    expect(validator.validate(10, {})).toBe(true)
    expect(validator.validate(-10, {})).toBe(false)
    expect(validator.validate(-11, {})).toBe(false)
  })
})
