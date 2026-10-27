import { describe, expect, it } from 'vitest'
import { getPageNumbers } from '../getPageNumbers'

describe(getPageNumbers, () => {
  describe('with 5 numbers range', () => {
    it('should get 1 if current page is 1, with 1 pages', () => {
      expect(getPageNumbers({ currentPage: 1, pageCount: 1 })).toStrictEqual([1])
    })
    it('should get 1,2 if current page is 1, with 2 pages', () => {
      expect(getPageNumbers({ currentPage: 1, pageCount: 2 })).toStrictEqual([1, 2])
    })
    it('should get 1,2,3 if current page is 1, with 3 pages', () => {
      expect(getPageNumbers({ currentPage: 1, pageCount: 3 })).toStrictEqual([1, 2, 3])
    })
    it('should get 1,2,3 if current page is 2, with 3 pages', () => {
      expect(getPageNumbers({ currentPage: 2, pageCount: 3 })).toStrictEqual([1, 2, 3])
    })
    it('should get 1,2,3,4 if current page is 3, with 4 pages', () => {
      expect(getPageNumbers({ currentPage: 3, pageCount: 4 })).toStrictEqual([1, 2, 3, 4])
    })
    it('should get 1,2,3,4 if current page is 1, with 4 pages', () => {
      expect(getPageNumbers({ currentPage: 1, pageCount: 4 })).toStrictEqual([1, 2, 3, 4])
    })
    it('should get 1,2,3,4,5 if current page is 3, with 5 pages', () => {
      expect(getPageNumbers({ currentPage: 3, pageCount: 5 })).toStrictEqual([1, 2, 3, 4, 5])
    })
    it('should get 2,3,4,5,6 if current page is 6, with 6 pages', () => {
      expect(getPageNumbers({ currentPage: 6, pageCount: 6 })).toStrictEqual([1, 2, 3, 4, 5, 6])
    })
    it('should get 1,3,4,5,6,7 if current page is 7, with 7 pages', () => {
      expect(getPageNumbers({ currentPage: 7, pageCount: 7 })).toStrictEqual([1, 3, 4, 5, 6, 7])
    })
    it('should get 1,2,3,4 if current page is 5, with 4 pages', () => {
      expect(getPageNumbers({ currentPage: 5, pageCount: 4 })).toStrictEqual([1, 2, 3, 4])
    })
    it('should get 1,9,10,11,20 if current page is 10, with 20 pages', () => {
      expect(getPageNumbers({ currentPage: 10, pageCount: 20 })).toStrictEqual([1, 9, 10, 11, 20])
    })
    it('should get 1,2,3,4,5,6,20 if current page is 5, with 20 pages and range = 6', () => {
      expect(getPageNumbers({ currentPage: 5, pageCount: 20, range: 6 })).toStrictEqual([1, 2, 3, 4, 5, 6, 20])
    })
    it('should get 9,10,11,20 if current page is 10, with 20 pages an hideFirstPage is true', () => {
      expect(getPageNumbers({ currentPage: 10, pageCount: 20, hideFirstPage: true })).toStrictEqual([9, 10, 11, 20])
    })
    it('should get 9,10,11 if current page is 10, with 20 pages an hideLastPage is true', () => {
      expect(getPageNumbers({ currentPage: 10, pageCount: 20, hideLastPage: true })).toStrictEqual([1, 9, 10, 11])
    })
    it('should get 9,10,11 if current page is 10, with 20 pages an hideFirstPage & hideLastPageis true', () => {
      expect(getPageNumbers({ currentPage: 10, pageCount: 20, hideFirstPage: true, hideLastPage: true })).toStrictEqual(
        [9, 10, 11],
      )
    })
  })
})
