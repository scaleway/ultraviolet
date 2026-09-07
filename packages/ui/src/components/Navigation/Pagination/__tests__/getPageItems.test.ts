import { describe, expect, it } from 'vitest'
import { getPageItems } from '../getPageItems'

const pages = (...pageNumbers: number[]) => pageNumbers.map(pageNumber => ({ type: 'page', page: pageNumber }))
const ellipsis = { type: 'ellipsis' }

describe('getPageItems with 3 buttons in center (desktop)', () => {
  it('should return a single page when there is only one page', () => {
    expect(getPageItems(1, 1, 5, 3)).toStrictEqual([...pages(1)])
  })
  it('should return the whole range when pageCount fits', () => {
    expect(getPageItems(1, 5, 5, 3)).toStrictEqual([...pages(1, 2, 3, 4, 5)])
  })
  it('should add an ellipsis before the current page', () => {
    expect(getPageItems(10, 20, 5, 3)).toStrictEqual([
      ...pages(1),
      ellipsis,
      ...pages(9, 10, 11),
      ellipsis,
      ...pages(20),
    ])
  })
  it('should add a trailing ellipsis', () => {
    expect(getPageItems(5, 20, 6, 3)).toStrictEqual([...pages(1, 2, 3, 4, 5, 6), ellipsis, ...pages(20)])
  })
  it('should handle hideFirstPage', () => {
    expect(getPageItems(10, 20, 5, 3, true)).toStrictEqual([ellipsis, ...pages(9, 10, 11), ellipsis, ...pages(20)])
  })
  it('should handle hideLastPage', () => {
    expect(getPageItems(10, 20, 5, 3, false, true)).toStrictEqual([
      ...pages(1),
      ellipsis,
      ...pages(9, 10, 11),
      ellipsis,
    ])
  })
  it('should show the page hidden behind an ellipsis when only one is hidden', () => {
    expect(getPageItems(4, 7, 5, 3)).toStrictEqual([...pages(1, 2, 3, 4, 5, 6, 7)])
  })
})

describe('getPageItems with 1 button in center (small)', () => {
  it('should show first pages when current page is in the first three', () => {
    expect(getPageItems(1, 10, 3, 1)).toStrictEqual([...pages(1, 2, 3), ellipsis, ...pages(10)])
    expect(getPageItems(2, 10, 3, 1)).toStrictEqual([...pages(1, 2, 3), ellipsis, ...pages(10)])
    expect(getPageItems(3, 10, 3, 1)).toStrictEqual([...pages(1, 2, 3), ellipsis, ...pages(10)])
  })
  it('should show first, current and last when in the middle', () => {
    expect(getPageItems(5, 10, 3, 1)).toStrictEqual([...pages(1), ellipsis, ...pages(5), ellipsis, ...pages(10)])
  })
  it('should expand the middle into the start window when only one page is hidden', () => {
    expect(getPageItems(3, 10, 3, 1)).toStrictEqual([...pages(1, 2, 3), ellipsis, ...pages(10)])
  })
  it('should expand the middle into the end window when only one page is hidden', () => {
    expect(getPageItems(8, 10, 3, 1)).toStrictEqual([...pages(1), ellipsis, ...pages(8, 9, 10)])
  })
  it('should show the last pages when current page is in the last two', () => {
    expect(getPageItems(9, 10, 3, 1)).toStrictEqual([...pages(1), ellipsis, ...pages(8, 9, 10)])
    expect(getPageItems(10, 10, 3, 1)).toStrictEqual([...pages(1), ellipsis, ...pages(8, 9, 10)])
  })
  it('should not render an ellipsis when the range covers all pages', () => {
    expect(getPageItems(1, 3, 3, 1)).toStrictEqual([...pages(1, 2, 3)])
  })
  it('should show the page hidden behind an ellipsis when only one is hidden', () => {
    expect(getPageItems(2, 5, 3, 1)).toStrictEqual([...pages(1, 2, 3, 4, 5)])
    expect(getPageItems(4, 5, 3, 1)).toStrictEqual([...pages(1, 2, 3, 4, 5)])
  })

  describe('edge cases', () => {
    it('should handle a single page', () => {
      expect(getPageItems(1, 1, 3, 1)).toStrictEqual([...pages(1)])
    })
    it('should handle two pages', () => {
      expect(getPageItems(1, 2, 3, 1)).toStrictEqual([...pages(1, 2)])
    })
    it('should handle four pages', () => {
      expect(getPageItems(2, 4, 3, 1)).toStrictEqual([...pages(1, 2, 3, 4)])
    })
  })

  describe('with hideFirstPage', () => {
    it('should show the first pages when on the first or second page', () => {
      expect(getPageItems(1, 10, 3, 1, true)).toStrictEqual([...pages(1, 2, 3), ellipsis, ...pages(10)])
      expect(getPageItems(2, 10, 3, 1, true)).toStrictEqual([...pages(1, 2, 3), ellipsis, ...pages(10)])
    })
    it('should hide the first page after the second page', () => {
      expect(getPageItems(3, 10, 3, 1, true)).toStrictEqual([ellipsis, ...pages(3), ellipsis, ...pages(10)])
    })
    it('should not show the first page in the middle', () => {
      expect(getPageItems(5, 10, 3, 1, true)).toStrictEqual([ellipsis, ...pages(5), ellipsis, ...pages(10)])
    })
  })

  describe('with hideLastPage', () => {
    it('should show the last pages when on the last two pages', () => {
      expect(getPageItems(9, 10, 3, 1, false, true)).toStrictEqual([...pages(1), ellipsis, ...pages(8, 9, 10)])
      expect(getPageItems(10, 10, 3, 1, false, true)).toStrictEqual([...pages(1), ellipsis, ...pages(8, 9, 10)])
    })
    it('should hide the last page before the penultimate page', () => {
      expect(getPageItems(8, 10, 3, 1, false, true)).toStrictEqual([...pages(1), ellipsis, ...pages(8), ellipsis])
    })
    it('should not show the last page in the middle', () => {
      expect(getPageItems(5, 10, 3, 1, false, true)).toStrictEqual([...pages(1), ellipsis, ...pages(5), ellipsis])
    })
  })
})
