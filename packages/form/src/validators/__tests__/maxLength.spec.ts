import maxLength from '../maxLength'

const fakeString = (size: number) => 'a'.repeat(size)

describe('maxLength validator', () => {
  test('should not throw error', () => {
    const validator = maxLength(1)
    expect(validator).toBeDefined()
    expect(validator.error).toBe('MAX_LENGTH')
  })

  test('should success', () => {
    const validator = maxLength(1)
    expect(validator.validate(fakeString(2), {})).toBe(false)
    expect(validator.validate(fakeString(5), {})).toBe(false)
  })

  test('should failed', () => {
    const validator = maxLength(10)
    expect(validator.validate(fakeString(1), {})).toBe(true)
    expect(validator.validate(fakeString(9), {})).toBe(true)
    expect(validator.validate(fakeString(10), {})).toBe(true)
    expect(validator.validate(fakeString(11), {})).toBe(false)
  })
})
