import { describe, expect, it } from 'vitest'
import { getPageNumbers } from '../getPageNumbers'

describe(getPageNumbers, () => {
  describe('with 5 numbers range', () => {
    it('should get 1 if current page is 1, with 1 pages', () => {
      expect(getPageNumbers(1, 1)).toEqual([1])
    })
    it('should get 1,2 if current page is 1, with 2 pages', () => {
      expect(getPageNumbers(1, 2)).toEqual([1, 2])
    })
    it('should get 1,2,3 if current page is 1, with 3 pages', () => {
      expect(getPageNumbers(1, 3)).toEqual([1, 2, 3])
    })
    it('should get 1,2,3 if current page is 2, with 3 pages', () => {
      expect(getPageNumbers(2, 3)).toEqual([1, 2, 3])
    })
    it('should get 1,2,3,4 if current page is 3, with 4 pages', () => {
      expect(getPageNumbers(3, 4)).toEqual([1, 2, 3, 4])
    })
    it('should get 1,2,3,4 if current page is 1, with 4 pages', () => {
      expect(getPageNumbers(1, 4)).toEqual([1, 2, 3, 4])
    })
    it('should get 1,2,3,4,5 if current page is 3, with 5 pages', () => {
      expect(getPageNumbers(3, 5)).toEqual([1, 2, 3, 4, 5])
    })
    it('should get 2,3,4,5,6 if current page is 6, with 6 pages', () => {
      expect(getPageNumbers(6, 6)).toEqual([1, 2, 3, 4, 5, 6])
    })
    it('should get 3,4,5,6,7 if current page is 7, with 7 pages', () => {
      expect(getPageNumbers(7, 7)).toEqual([1, 3, 4, 5, 6, 7])
    })
    it('should get 1,2,3,4 if current page is 1, with 4 pages', () => {
      expect(getPageNumbers(1, 4)).toEqual([1, 2, 3, 4])
    })
    it('should get 1,2,3,4 if current page is 5, with 4 pages', () => {
      expect(getPageNumbers(5, 4)).toEqual([1, 2, 3, 4])
    })
    it('should get 8,9,10,11,12 if current page is 10, with 20 pages', () => {
      expect(getPageNumbers(10, 20)).toEqual([1, 9, 10, 11, 20])
    })
  })
})
