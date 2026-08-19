'use client'

import { cn } from '@ultraviolet/utils'
import { Button } from '../Button'
import { Ellipsis } from './Ellipsis'
import { paginationStyle } from './styles.css'

type MakeButtonProps = {
  hasEllipsisBefore: boolean
  pageNumber: number
  disabled?: boolean
  page: number
  pageCount: number
  hideFirstPage?: boolean
  hideLastPage?: boolean
  handlePageClick: (pageNumber: number) => () => void
  size: 'small' | 'medium'
}
export const MakeButton = ({
  hasEllipsisBefore,
  pageNumber,
  disabled,
  page,
  pageCount,
  hideFirstPage,
  hideLastPage,
  handlePageClick,
  size,
}: MakeButtonProps) => {
  const isFirstPage = pageNumber === 1 && !hideFirstPage
  const isLastPage = pageNumber === pageCount && !hideLastPage
  const isCurrentPage = pageNumber === page
  const shouldHideOnSmall = !isCurrentPage && !isFirstPage && !isLastPage
  const showEllipsisAfterOnSmall = isCurrentPage && !hideLastPage && pageCount > page + 1
  const showEllipsisBefore = hasEllipsisBefore || (isCurrentPage && !hideFirstPage && page > 2)
  const ellipsisBeforeClassName = hasEllipsisBefore
    ? paginationStyle.hiddenOnSmall[size]
    : paginationStyle.showOnSmall[size]

  return (
    <>
      {showEllipsisBefore ? <Ellipsis className={ellipsisBeforeClassName} disabled={disabled} size={size} /> : null}
      <Button
        aria-current={isCurrentPage}
        className={cn(paginationStyle.pageButton[size], shouldHideOnSmall ? paginationStyle.hiddenOnSmall[size] : null)}
        disabled={disabled}
        onClick={handlePageClick(pageNumber)}
        sentiment={isCurrentPage ? 'primary' : 'neutral'}
        size={size}
        type="button"
        variant={isCurrentPage ? 'filled' : 'outlined'}
      >
        {pageNumber}
      </Button>
      {showEllipsisAfterOnSmall ? (
        <Ellipsis className={paginationStyle.showOnSmall[size]} disabled={disabled} size={size} />
      ) : null}
    </>
  )
}
