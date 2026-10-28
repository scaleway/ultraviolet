import { describe, expect, it } from 'vitest'
import {
  addZero,
  createDate,
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
  it('getMonthFirstDay should work', () => {
    expect(getMonthFirstDay(1, 2000)).toBe(5)
  })

  it('addZero should work', () => {
    expect(addZero(1)).toBe('01')
  })

  it('getPreviousMonth should work', () => {
    const beforeJan2000 = getPreviousMonth(1, 2000)
    expect(beforeJan2000[0]).toBe(12)
    expect(beforeJan2000[1]).toBe(1999)

    const beforeDec2000 = getPreviousMonth(12, 2000)
    expect(beforeDec2000[0]).toBe(11)
    expect(beforeDec2000[1]).toBe(2000)
  })

  it('getNextMonth should work', () => {
    const afterDec2000 = getNextMonth(12, 2000)
    expect(afterDec2000[0]).toBe(1)
    expect(afterDec2000[1]).toBe(2001)

    const afterNo000 = getNextMonth(11, 2000)
    expect(afterNo000[0]).toBe(12)
    expect(afterNo000[1]).toBe(2000)
  })

  it('isSameMonth should work', () => {
    expect(isSameMonth(new Date('23 Dec 2023'), new Date('22 Dec 2023'))).toBe(true)
    expect(isSameMonth(new Date('23 Dec 2023'), new Date('23 Oct 2023'))).toBe(false)
  })

  it('isSameDay should work', () => {
    expect(isSameDay(new Date(), new Date('22 Dec 1999'))).toBe(false)
    expect(isSameDay(new Date('23 Dec 2023'), new Date('23 Dec 2023'))).toBe(true)
  })

  it('formatValue should work with default formatting', () => {
    expect(
      formatValue({ computedRange: null, computedValue: date, selectsRange: false, showMonthYearPicker: false }),
    ).toBe('20/11/2000')
    expect(
      formatValue({ computedRange: null, computedValue: date, selectsRange: false, showMonthYearPicker: true }),
    ).toBe('11/2000')
    expect(
      formatValue({ computedRange: null, computedValue: date, selectsRange: true, showMonthYearPicker: false }),
    ).toBe('20/11/2000')

    expect(
      formatValue({ computedRange: rangeDate, computedValue: null, selectsRange: false, showMonthYearPicker: false }),
    ).toBeUndefined()
    expect(
      formatValue({ computedRange: rangeDate, computedValue: null, selectsRange: true, showMonthYearPicker: true }),
    ).toBe('10/2000 - 10/2000')
    expect(
      formatValue({ computedRange: rangeDate, computedValue: null, selectsRange: true, showMonthYearPicker: false }),
    ).toBe('20/10/2000 - 31/10/2000')
  })

  it('formatValue should work with custom formatting', () => {
    expect(
      formatValue({
        computedRange: null,
        computedValue: date,
        format,
        selectsRange: false,
        showMonthYearPicker: false,
      }),
    ).toBe('2000')
    expect(
      formatValue({ computedRange: null, computedValue: date, format, selectsRange: false, showMonthYearPicker: true }),
    ).toBe('2000')
    expect(
      formatValue({ computedRange: null, computedValue: date, format, selectsRange: true, showMonthYearPicker: false }),
    ).toBe('2000')

    expect(
      formatValue({
        computedRange: rangeDate,
        computedValue: null,
        format,
        selectsRange: false,
        showMonthYearPicker: false,
      }),
    ).toBeUndefined()
    expect(
      formatValue({
        computedRange: rangeDate,
        computedValue: null,
        format,
        selectsRange: true,
        showMonthYearPicker: true,
      }),
    ).toBe('2000 - 2000')
    expect(
      formatValue({
        computedRange: rangeDate,
        computedValue: null,
        format,
        selectsRange: true,
        showMonthYearPicker: false,
      }),
    ).toBe('2000 - 2000')
  })

  it('createDate should work', () => {
    expect(createDate({ showMonthYearPicker: false, value: '12/02/2020' })).toStrictEqual(new Date(2020, 1, 12))
    expect(createDate({ showMonthYearPicker: false, value: '12-02-2020' })).toStrictEqual(new Date(2020, 1, 12))
    expect(createDate({ showMonthYearPicker: false, value: '12 may 2020' })).toStrictEqual(new Date(2020, 4, 12))
  })

  it('createDate should work with min and maxDate', () => {
    expect(
      createDate({ minDate: new Date(2020, 1, 15), showMonthYearPicker: false, value: '12/02/2020' }),
    ).toStrictEqual(new Date(2020, 1, 15))
    expect(
      createDate({ maxDate: new Date(2020, 1, 10), showMonthYearPicker: false, value: '12/02/2020' }),
    ).toStrictEqual(new Date(2020, 1, 10))
  })

  it('createdate should work with showMonthYearPicker', () => {
    expect(createDate({ showMonthYearPicker: true, value: '12/2020' })).toStrictEqual(new Date(2020, 11, 1))
    expect(createDate({ showMonthYearPicker: true, value: '12-2020' })).toStrictEqual(new Date(2020, 11, 1))
    expect(createDate({ showMonthYearPicker: true, value: '2020/12' })).toStrictEqual(new Date(2020, 11, 1))
  })
})
