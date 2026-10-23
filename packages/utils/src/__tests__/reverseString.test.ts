import { describe, expect, it } from 'vitest'
import { reverseString } from '../reverseString'

describe(reverseString, () => {
  it('reverses ASCII text', () => {
    expect(reverseString('hello')).toBe('olleh')
    expect(reverseString('abc 123')).toBe('321 cba')
  })

  it('returns an empty string for empty and nullish values', () => {
    expect(reverseString('')).toBe('')
    expect(reverseString(null)).toBe('')
    expect(reverseString(undefined)).toBe('')
  })

  it('keeps multi-code-point graphemes intact', () => {
    expect(reverseString('a👩‍❤️‍👩b')).toBe('b👩‍❤️‍👩a')
    expect(reverseString('hi 👋🏽!')).toBe('!👋🏽 ih')
  })
})
