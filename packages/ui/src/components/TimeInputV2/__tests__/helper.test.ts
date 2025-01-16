import { describe, expect, test } from 'vitest'
import {
  canConcat,
  format,
  getLastTypedChar,
  getValueByType,
  isAOrP,
  isCompleteHour,
  isNumber,
  setValueByType,
} from '../helpers'

describe('Helper functions dateInput', () => {
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
    expect(canConcat(3, 'h', 3, 12)).toBe(false)
    expect(canConcat(1, 'm', 2, 24)).toBe(true)
    expect(canConcat(1, 'm', 2, 12)).toBe(true)
  })

  test('isCompleteHour should work', () => {
    expect(isCompleteHour(24, 2)).toBe(false)
    expect(isCompleteHour(12, 13)).toBe(true)
    expect(isCompleteHour(24, 4)).toBe(true)
  })

  test('getLastTypedChar should work', () => {
    expect(getLastTypedChar('011', 1)).toBe('1')
    expect(getLastTypedChar('123', 12)).toBe('3')
    expect(getLastTypedChar('123', 123)).toBe('')
  })

  test('getValueByType should work', () => {
    const date = new Date('01/01/2000 13:30:59')
    expect(getValueByType('h', date)).toBe(13)
    expect(getValueByType('m', date)).toBe(30)
    expect(getValueByType('s', date)).toBe(59)
  })

  test('setValueByType should work', () => {
    const date = new Date('01/01/2000 13:30:59')
    setValueByType('h', date, 8)
    setValueByType('m', date, 14)
    setValueByType('s', date, 12)

    expect(date.getHours()).toBe(8)
    expect(date.getMinutes()).toBe(14)
    expect(date.getSeconds()).toBe(12)
  })

  test('format should work', () => {
    expect(format(0, 'h', 24)).toBe('00')
    expect(format(0, 'h', 12)).toBe('12')
    expect(format(9, 'm', 24)).toBe('09')
  })
})
