import { describe, expect, it } from 'vitest'
import { toCharacterArray } from '../toCharacterArray'

describe(toCharacterArray, () => {
  it('splits an empty string into an empty array', () => {
    expect(toCharacterArray('')).toStrictEqual([])
  })

  it('should return an empty array for nullish values', () => {
    expect(toCharacterArray(null)).toStrictEqual([])
    expect(toCharacterArray(undefined)).toStrictEqual([])
  })

  it.each`
    value        | expected
    ${'hello'}   | ${['h', 'e', 'l', 'l', 'o']}
    ${'abc 123'} | ${['a', 'b', 'c', ' ', '1', '2', '3']}
  `('splits ASCII text $value', ({ value, expected }: { value: string; expected: string }) => {
    expect(toCharacterArray(value)).toStrictEqual(expected)
  })

  it('keeps a surrogate-pair emoji as a single character', () => {
    expect(toCharacterArray('😀')).toStrictEqual(['😀'])
  })

  it('keeps a ZWJ family emoji as a single character', () => {
    expect(toCharacterArray('👩‍❤️‍👩')).toStrictEqual(['👩‍❤️‍👩'])
  })

  it('keeps a skin-tone modified emoji as a single character', () => {
    expect(toCharacterArray('👍🏽')).toStrictEqual(['👍🏽'])
  })

  it('keeps a flag emoji as a single character', () => {
    expect(toCharacterArray('🇫🇷')).toStrictEqual(['🇫🇷'])
  })

  it('keeps a combining mark with its base character', () => {
    expect(toCharacterArray('e\u0301')).toStrictEqual(['e\u0301'])
  })

  it('splits mixed text and graphemes correctly', () => {
    expect(toCharacterArray('a👩‍❤️‍👩b')).toStrictEqual(['a', '👩‍❤️‍👩', 'b'])
    expect(toCharacterArray('hi 👋🏽!')).toStrictEqual(['h', 'i', ' ', '👋🏽', '!'])
  })
})
