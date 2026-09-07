import { getPageNumbers } from './getPageNumbers'

export type PageItem = { type: 'page'; page: number } | { type: 'ellipsis' }

const toPageItems = (pageNumbers: number[], pageCount: number): PageItem[] => {
  const items: PageItem[] = []

  pageNumbers.forEach((pageNumber, index) => {
    const hasEllipsisBefore =
      !(index === 0 || pageNumbers[index - 1] === pageNumber - 1) || (index === 0 && pageNumber !== 1)
    if (hasEllipsisBefore) {
      items.push({ type: 'ellipsis' })
    }
    items.push({ type: 'page', page: pageNumber })
  })

  if (pageNumbers.at(-1) !== pageCount) {
    items.push({ type: 'ellipsis' })
  }

  return items
}

/**
 * When two shown pages are separated by a single hidden page, that page is
 * rendered instead of an ellipsis (an ellipsis would only hide one page).
 * Replacing an ellipsis slot with a page button keeps the slot count unchanged.
 */
const expandSinglePageGaps = (pageNumbers: number[]): number[] =>
  pageNumbers.flatMap((pageNumber, index) =>
    index > 0 && pageNumber - pageNumbers[index - 1] === 2 ? [pageNumber - 1, pageNumber] : [pageNumber],
  )

export const getPageItems = (
  page: number,
  pageCount: number,
  range: number,
  numberOfButtonsInBetween: number,
  hideFirstPage?: boolean,
  hideLastPage?: boolean,
): PageItem[] => {
  if (pageCount <= 1) {
    return [{ type: 'page', page: 1 }]
  }

  const pageNumbers = getPageNumbers(page, pageCount, range, numberOfButtonsInBetween, hideFirstPage, hideLastPage)

  return toPageItems(expandSinglePageGaps(pageNumbers), pageCount)
}
