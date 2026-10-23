import { describe, expect, it } from 'vitest'
import { shuffle } from '../shuffle'

describe(shuffle, () => {
  it('should return the same string when it has 0 or 1 character', () => {
    expect(shuffle('')).toBe('')
    expect(shuffle('a')).toBe('a')
  })

  it('should return the same string when all characters are identical', () => {
    expect(shuffle('aaa')).toBe('aaa')
  })

  it('should return an empty string for nullish values', () => {
    expect(shuffle(null)).toBe('')
    expect(shuffle(undefined)).toBe('')
  })

  it('should return a string with the same characters', () => {
    const input = 'abcdef'
    const result = shuffle(input)

    expect(result).toHaveLength(input.length)
    for (const char of ['a', 'b', 'c', 'd', 'e', 'f']) {
      expect(result).toContain(char)
    }
  })

  it('should return a strictly different string for multi-character input', () => {
    for (let i = 0; i < 10; i++) {
      expect(shuffle('abcdef')).not.toBe('abcdef')
    }
  })

  it('should handle complex emojis as single characters', () => {
    const input = '👨‍👩‍👧‍👦abc'
    const result = shuffle(input)

    expect(result).toHaveLength(input.length)
    for (const char of ['👨‍👩‍👧‍👦', 'a', 'b', 'c']) {
      expect(result).toContain(char)
    }
  })
})
