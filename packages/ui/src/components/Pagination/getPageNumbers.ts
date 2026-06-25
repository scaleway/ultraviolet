const NUMBER_OF_BUTTONS_IN_BETWEEN = 3
/**
 * Return a list of page numbers around the currentPage
 * @param currentPage The current page
 * @param pageCount The last page number
 * @param range The number of pages wanted
 * @returns List of page numbers to display
 */
export const getPageNumbers = (
  currentPage: number,
  pageCount: number,
  range = 5,
  hideFirstPage?: boolean,
  hideLastPage?: boolean,
): number[] => {
  const truncationBefore = currentPage >= range
  const truncationAfter = currentPage <= pageCount - range + 1 || currentPage < range

  // No truncation when there are less than "range" pages
  if (pageCount <= range) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  const firstPage = hideFirstPage ? [] : [1] // do not show first if it should be truncated page when hideFirstPage
  const lastPage = hideLastPage ? [] : [pageCount] // same but for the last page

  const pagesToShowBeforeTruncation = truncationBefore
    ? firstPage
    : Array.from({ length: range }, (_, index) => index + 1)

  const pagesToShowAfterTruncation = truncationAfter
    ? lastPage
    : Array.from({ length: range }, (_, index) => index + pageCount - range + 1)

  const pagesToShowBetweenTruncation =
    truncationBefore && truncationAfter
      ? Array.from({ length: NUMBER_OF_BUTTONS_IN_BETWEEN }, (_, index) => currentPage + index - 1)
      : []

  return [...pagesToShowBeforeTruncation, ...pagesToShowBetweenTruncation, ...pagesToShowAfterTruncation]
}
