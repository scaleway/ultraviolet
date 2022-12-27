import minlength from '../minLength'

const fakeString = (size: number) => 'a'.repeat(size)

describe('minlength validator', () => {
  test('should not throw error', () => {
    const validator = minlength(1)
    expect(validator).toBeDefined()
    expect(validator.error).toBe('MIN_LENGTH')
  })

  test('should success', () => {
    const validator = minlength(1)
    expect(validator.validate(fakeString(2), {})).toBe(true)
    expect(validator.validate(fakeString(5), {})).toBe(true)
  })

  test('should failed', () => {
    const validator = minlength(10)
    expect(validator.validate(fakeString(1), {})).toBe(false)
    expect(validator.validate(fakeString(9), {})).toBe(false)
    expect(validator.validate(fakeString(10), {})).toBe(true)
  })
})
