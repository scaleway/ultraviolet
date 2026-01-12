import { describe, expect, it } from 'vitest'
import {
  getAverage,
  getCurrent,
  getMax,
  getMaxChartValue,
  getMin,
  getMinChartValue,
  getSelected,
} from '../helpers'

const chartValues = [
  {
    data: [
      { x: '2018-01-01', y: 7 },
      { x: '2018-01-02', y: 5 },
      { x: '2018-01-03', y: 11 },
      { x: '2018-01-04', y: 9 },
      { x: '2018-01-05', y: 12 },
      { x: '2018-01-06', y: 16 },
      { x: '2018-01-07', y: 13 },
      { x: '2018-01-08', y: 13 },
    ],
    id: 'fake corp. A',
  },
  {
    data: [
      { x: '2018-01-01', y: 17 },
      { x: '2018-01-02', y: 12 },
      { x: '2018-01-03', y: 11 },
      { x: '2018-01-04', y: 19 },
      { x: '2018-01-05', y: 12 },
      { x: '2018-01-06', y: 16 },
      { x: '2018-01-07', y: 13 },
      { x: '2018-01-08', y: 13 },
    ],
    id: 'fake corp. B',
  },
]

const chartValuesFloat = [
  {
    data: [
      { x: '2018-01-01', y: 7.99 },
      { x: '2018-01-02', y: 5.5 },
      { x: '2018-01-03', y: 11 },
      { x: '2018-01-04', y: 9.3 },
      { x: '2018-01-05', y: 12 },
      { x: '2018-01-06', y: 16.33 },
      { x: '2018-01-07', y: 13.566_45 },
      { x: '2018-01-08', y: 13 },
    ],
    id: 'fake corp. A',
  },
  {
    data: [
      { x: '2018-01-01', y: 17.99 },
      { x: '2018-01-02', y: 15.5 },
      { x: '2018-01-03', y: 11 },
      { x: '2018-01-04', y: 19.3 },
      { x: '2018-01-05', y: 12 },
      { x: '2018-01-06', y: 16.33 },
      { x: '2018-01-07', y: 13.566_45 },
      { x: '2018-01-08', y: 13 },
    ],
    id: 'fake corp. A',
  },
]

const values = [20, 38, 70, 40, 30, 20, 30, 80, 70, 50, 60, 65, 68, 65, 20]
const valuesFloatMix = [
  20.7, 38.823_23, 72, 40.7, 30.3, 20.7, 30.1, 80.8, 70, 50.2, 63, 65.1, 68.22,
  65.3, 19.1,
]
const valuesString = valuesFloatMix.map(x => x.toString())
const emptyValues: never[] = []
const errorValues = undefined

describe('line Chart', () => {
  describe('getMinChartValue', () => {
    it('should return the smallest value of integer values', () => {
      expect(getMinChartValue(chartValues)).toBe(4)
    })
    it('should return the smallest value of integer/float mix values', () => {
      expect(getMinChartValue(chartValuesFloat)).toBe(4)
    })
    it('should return 0 when there are no values', () => {
      expect(getMinChartValue(emptyValues)).toBe(0)
    })
    it('should return 0 when values are undefined', () => {
      expect(getMinChartValue(errorValues)).toBe(0)
    })
  })

  describe('getMaxChartValue', () => {
    it('should return the highest value of integer values', () => {
      expect(getMaxChartValue(chartValues)).toBe(21)
    })
    it('should return the highest value of integer/float mix values', () => {
      expect(getMaxChartValue(chartValuesFloat)).toBe(22)
    })
    it('should return 0 when there are no values', () => {
      expect(getMaxChartValue(emptyValues)).toBe(0)
    })
    it('should return 0 when values are undefined', () => {
      expect(getMaxChartValue(errorValues)).toBe(0)
    })
  })

  describe('getMin', () => {
    it('should return the smallest value of integer values', () => {
      expect(getMin(values)).toBe(20)
    })
    it('should return the smallest value of integer/float mix values', () => {
      expect(getMin(valuesFloatMix)).toBe(19.1)
    })
    it('should return the smallest value of integer/float mix values as string', () => {
      expect(getMin(valuesString)).toBe(19.1)
    })
    it('should return 0 when there are no values', () => {
      expect(getMin(emptyValues)).toBe(0)
    })
    it('should return 0 when values are undefined', () => {
      expect(getMin(errorValues)).toBe(0)
    })
  })

  describe('getMax', () => {
    it('should return the greatest value of integer values', () => {
      expect(getMax(values)).toBe(80)
    })
    it('should return the greatest value integer/float mix values', () => {
      expect(getMax(valuesFloatMix)).toBe(80.8)
    })
    it('should return the greatest value integer/float mix values as string', () => {
      expect(getMax(valuesString)).toBe(80.8)
    })
    it('should return 0 when there are no values', () => {
      expect(getMax(emptyValues)).toBe(0)
    })
    it('should return 0 when values are undefined', () => {
      expect(getMax(errorValues)).toBe(0)
    })
  })
  describe('getAverage', () => {
    it('should return the average value', () => {
      expect(getAverage(values)).toBe(48.4)
    })
    it('should return average when there are string values', () => {
      expect(getAverage(valuesString)).toBe(49)
    })
    it('should return 0 when there are no values', () => {
      expect(getAverage(emptyValues)).toBe(0)
    })
    it('should return 0 when values are undefined', () => {
      expect(getAverage(errorValues)).toBe(0)
    })
  })
  describe('getCurrent', () => {
    it('should return the last value', () => {
      expect(getCurrent(values)).toBe(20)
    })
    it('should return 0 when there are no values', () => {
      expect(getCurrent(emptyValues)).toBe(0)
    })
    it('should return 0 when values are undefined', () => {
      expect(getCurrent(errorValues)).toBe(0)
    })
  })
  describe('getSelected', () => {
    it('should remove label already selected', () => {
      expect(getSelected('one', 0, ['one0', 'two1'])).toStrictEqual(['two1'])
    })
    it('should add label not selected', () => {
      expect(getSelected('two', 1, ['one0'])).toStrictEqual(['one0', 'two1'])
    })
  })
})
