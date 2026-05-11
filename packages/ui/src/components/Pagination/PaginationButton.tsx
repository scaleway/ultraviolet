'use client'

import { Button } from '../Button'
import { Text } from '../Text'
import { paginationStyle } from './styles.css'

type MakeButtonProps = {
  hasEllipsisBefore: boolean
  pageNumber: number
  disabled?: boolean
  page: number
  handlePageClick: (pageNumber: number) => () => void
  perPage: boolean
}
export const MakeButton = ({
  hasEllipsisBefore,
  pageNumber,
  disabled,
  page,
  handlePageClick,
  perPage,
}: MakeButtonProps) => (
  <>
    {hasEllipsisBefore ? (
      <Text
        aria-label="ellipsis"
        as="span"
        className={paginationStyle.ellipsisClass[perPage ? 'small' : 'medium']}
        disabled={disabled}
        placement="center"
        prominence="default"
        sentiment="neutral"
        variant="body"
      >
        ...
      </Text>
    ) : null}
    <Button
      aria-current={pageNumber === page}
      className={paginationStyle.pageButton[perPage ? 'small' : 'medium']}
      disabled={disabled}
      onClick={handlePageClick(pageNumber)}
      sentiment={pageNumber === page ? 'primary' : 'neutral'}
      size={perPage ? 'small' : 'medium'}
      type="button"
      variant={pageNumber === page ? 'filled' : 'outlined'}
    >
      {pageNumber}
    </Button>
  </>
)
