'use client'

import { Button } from '../Button'
import { Ellipsis } from './Ellipsis'
import { paginationStyle } from './styles.css'

type MakeButtonProps = {
  hasEllipsisBefore: boolean
  pageNumber: number
  disabled?: boolean
  page: number
  handlePageClick: (pageNumber: number) => () => void
  size: 'small' | 'medium'
}
export const MakeButton = ({
  hasEllipsisBefore,
  pageNumber,
  disabled,
  page,
  handlePageClick,
  size,
}: MakeButtonProps) => (
  <>
    {hasEllipsisBefore ? <Ellipsis disabled={disabled} size={size} /> : null}
    <Button
      aria-current={pageNumber === page}
      className={paginationStyle.pageButton[size]}
      disabled={disabled}
      onClick={handlePageClick(pageNumber)}
      sentiment={pageNumber === page ? 'primary' : 'neutral'}
      size={size}
      type="button"
      variant={pageNumber === page ? 'filled' : 'outlined'}
    >
      {pageNumber}
    </Button>
  </>
)
