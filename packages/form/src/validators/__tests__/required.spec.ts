import { requiredValidator } from '../required'

describe('required validator', () => {
  test('should not throw error', () => {
    expect(requiredValidator(undefined)).toBeDefined()
    expect(requiredValidator(undefined).error).toBe('REQUIRED')
  })

  test('should success', () => {
    expect(requiredValidator(undefined).validate('test', {})).toBe(true)
    expect(requiredValidator(undefined).validate(true, {})).toBe(true)
    expect(requiredValidator(undefined).validate({}, {})).toBe(true)
    expect(requiredValidator(false).validate('', {})).toBe(true)
    expect(requiredValidator(false).validate(undefined, {})).toBe(true)
    expect(requiredValidator(false).validate(false, {})).toBe(true)
  })

  test('should failed', () => {
    expect(requiredValidator(true).validate('', {})).toBe(false)
    expect(requiredValidator(true).validate(undefined, {})).toBe(false)
    expect(requiredValidator(true).validate(false, {})).toBe(false)
  })
})
