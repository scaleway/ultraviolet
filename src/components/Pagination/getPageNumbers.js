export default function getPageNumbers(currentPage, pageCount, range = 5) {
  const gap = Math.floor(range / 2)
  let end = currentPage + gap
  let remaining = 0
  if (end > pageCount) {
    remaining = end - pageCount
    end = pageCount
  }
  let start = currentPage - gap - remaining
  if (start < 1) {
    remaining = -start + 1
    start = 1
  }
  if (end < pageCount) {
    end += remaining
  }

  return [...Array(end - start + 1).keys()].map(k => start + k)
}
