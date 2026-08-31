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

  it('should return a string with the same characters', () => {
    const input = 'abcdef'
    const result = shuffle(input)

    expect(result).toHaveLength(input.length)
    expect([...result].sort()).toEqual([...input].sort())
  })

  it('should return a strictly different string for multi-character input', () => {
    for (let i = 0; i < 10; i++) {
      expect(shuffle('abcdef')).not.toBe('abcdef')
    }
  })

  it('should handle emojis as single characters', () => {
    const input = '👨‍👩‍👧‍👦abc'
    const result = shuffle(input)

    expect(result).toHaveLength(input.length)
    expect([...result].sort()).toEqual([...input].sort())
  })
})
