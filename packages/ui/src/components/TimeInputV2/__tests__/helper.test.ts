import { describe, expect, test } from 'vitest'
import {
  canConcat,
  formatValue,
  isAOrP,
  isCompleteHour,
  isNumber,
} from '../helpers'

const value1 = {
  h: '1',
  m: '23',
  s: '45',
  period: 'am',
} as const

const value2 = {
  h: '14',
  m: '23',
  s: '45',
} as const

describe('Helper functions dateInput', () => {
  test('formatValue should work', () => {
    expect(formatValue(value1, 12)).toStrictEqual({
      h: '01',
      m: '23',
      s: '45',
      period: 'am',
    })
    expect(formatValue(value1, 24)).toStrictEqual({
      h: '01',
      m: '23',
      s: '45',
    })
    expect(formatValue(value2, 24)).toStrictEqual({
      h: '14',
      m: '23',
      s: '45',
    })
    expect(formatValue(value2, 12)).toStrictEqual({
      h: '02',
      m: '23',
      s: '45',
      period: 'pm',
    })
  })

  test('isNumber should work', () => {
    expect(isNumber('2')).toBe(true)
    expect(isNumber('a')).toBe(false)
  })

  test('isAOrP should work', () => {
    expect(isAOrP('a')).toBe(true)
    expect(isAOrP('p')).toBe(true)
    expect(isAOrP('d')).toBe(false)
  })

  test('canConcat should work', () => {
    expect(canConcat('3', 'h', '3', 12)).toBe(false)
    expect(canConcat('1', 'm', '2', 24)).toBe(true)
    expect(canConcat('1', 'm', '2', 12)).toBe(true)
  })

  test('isCompleteHour should work', () => {
    expect(isCompleteHour(24, '2')).toBe(false)
    expect(isCompleteHour(12, '13')).toBe(true)
    expect(isCompleteHour(24, '4')).toBe(true)
    expect(isCompleteHour(12, undefined)).toBe(false)
  })
})
