/**
 * Return a list of page numbers around the currentPage
 * @param currentPage The current page
 * @param pageCount The last page number
 * @param range The number of pages wanted
 * @returns List of page numbers around currentPage
 */
export default function getPageNumbers(
  currentPage: number,
  pageCount: number,
  range = 5,
): number[] {
  const gap = Math.floor(range / 2)
  let end = currentPage + gap
  let remaining = 0
  if (end > pageCount) {
    remaining = end - pageCount
    end = pageCount
  }
  let start = currentPage - gap - remaining
  if (start < 1) {
    remaining = Math.abs(start - 1)
    start = 1
  }
  if (end < pageCount) {
    end = Math.min(end + remaining, pageCount)
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}
