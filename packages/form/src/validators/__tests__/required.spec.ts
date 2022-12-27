import required from '../required'

describe('required validator', () => {
  test('should not throw error', () => {
    expect(required(undefined)).toBeDefined()
    expect(required(undefined).error).toBe('REQUIRED')
  })

  test('should success', () => {
    expect(required(undefined).validate('test', {})).toBe(true)
    expect(required(undefined).validate(true, {})).toBe(true)
    expect(required(undefined).validate({}, {})).toBe(true)
    expect(required(false).validate('', {})).toBe(true)
    expect(required(false).validate(undefined, {})).toBe(true)
    expect(required(false).validate(false, {})).toBe(true)
  })

  test('should failed', () => {
    expect(required(true).validate('', {})).toBe(false)
    expect(required(true).validate(undefined, {})).toBe(false)
    expect(required(true).validate(false, {})).toBe(false)
  })
})
