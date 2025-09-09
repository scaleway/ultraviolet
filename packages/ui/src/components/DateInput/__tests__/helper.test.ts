import { describe, expect, test } from 'vitest'
import {
  addZero,
  formatValue,
  getMonthFirstDay,
  getNextMonth,
  getPreviousMonth,
  isSameDay,
  isSameMonth,
} from '../helpers'

const rangeDate = {
  end: new Date('31 October 2000'),
  start: new Date('20 October 2000'),
}

const date = new Date('20 November 2000')

const format = (value?: Date) => (value ? String(value.getFullYear()) : '1999')

describe('helper functions dateInput', () => {
  test('getMonthFirstDay should work', () => {
    expect(getMonthFirstDay(1, 2000)).toBe(5)
  })

  test('addZero should work', () => {
    expect(addZero(1)).toBe('01')
  })

  test('getPreviousMonth should work', () => {
    const beforeJan2000 = getPreviousMonth(1, 2000)
    expect(beforeJan2000[0]).toBe(12)
    expect(beforeJan2000[1]).toBe(1999)

    const beforeDec2000 = getPreviousMonth(12, 2000)
    expect(beforeDec2000[0]).toBe(11)
    expect(beforeDec2000[1]).toBe(2000)
  })

  test('getNextMonth should work', () => {
    const afterDec2000 = getNextMonth(12, 2000)
    expect(afterDec2000[0]).toBe(1)
    expect(afterDec2000[1]).toBe(2001)

    const afterNo000 = getNextMonth(11, 2000)
    expect(afterNo000[0]).toBe(12)
    expect(afterNo000[1]).toBe(2000)
  })

  test('isSameMonth should work', () => {
    expect(
      isSameMonth(new Date('23 Dec 2023'), new Date('22 Dec 2023')),
    ).toBeTruthy()
    expect(
      isSameMonth(new Date('23 Dec 2023'), new Date('23 Oct 2023')),
    ).toBeFalsy()
  })

  test('isSameDay should work', () => {
    expect(isSameDay(new Date(), new Date('22 Dec 1999'))).toBeFalsy()
    expect(
      isSameDay(new Date('23 Dec 2023'), new Date('23 Dec 2023')),
    ).toBeTruthy()
  })

  test('formatValue should work with default formatting', () => {
    expect(formatValue(date, null, false, false)).toBe('11/20/2000')
    expect(formatValue(date, null, true, false)).toBe('11/2000')
    expect(formatValue(date, null, false, true)).toBe('11/20/2000')

    expect(formatValue(null, rangeDate, false, false)).toBe(undefined)
    expect(formatValue(null, rangeDate, true, true)).toBe('10/2000 - 10/2000')
    expect(formatValue(null, rangeDate, false, true)).toBe(
      '10/20/2000 - 10/31/2000',
    )
  })

  test('formatValue should work with custom formatting', () => {
    expect(formatValue(date, null, false, false, format)).toBe('2000')
    expect(formatValue(date, null, true, false, format)).toBe('2000')
    expect(formatValue(date, null, false, true, format)).toBe('2000')

    expect(formatValue(null, rangeDate, false, false, format)).toBe(undefined)
    expect(formatValue(null, rangeDate, true, true, format)).toBe('2000 - 2000')
    expect(formatValue(null, rangeDate, false, true, format)).toBe(
      '2000 - 2000',
    )
  })
})
