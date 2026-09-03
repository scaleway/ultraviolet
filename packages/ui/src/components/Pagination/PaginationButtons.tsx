'use client'

import { ArrowLeftIcon } from '@ultraviolet/icons/ArrowLeftIcon'
import { ArrowRightIcon } from '@ultraviolet/icons/ArrowRightIcon'
import { useCallback, useMemo } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Ellipsis } from './Ellipsis'
import { getPageItems } from './getPageItems'
import { paginationStyle } from './styles.css'

type PaginationButtonsProps = {
  page: number
  disabled: boolean
  onChange: (newPage: number) => void
  pageCount: number
  pageTabCount: number
  className?: string
  'data-testid'?: string
  hideFirstPage?: boolean
  hideLastPage?: boolean
  isSmall: boolean
  size: 'small' | 'medium'
}

export const PaginationButtons = ({
  page,
  disabled,
  onChange,
  pageCount,
  pageTabCount,
  'data-testid': dataTestId,
  className,
  hideFirstPage,
  hideLastPage,
  isSmall,
  size,
}: PaginationButtonsProps) => {
  const goToNextPage = useCallback(() => {
    onChange(page + 1)
  }, [onChange, page])

  const goToPreviousPage = useCallback(() => {
    onChange(page - 1)
  }, [onChange, page])

  const pageItems = useMemo(() => {
    const buttonsInCenter = isSmall ? 1 : 3
    return getPageItems(page, pageCount, pageTabCount, buttonsInCenter, hideFirstPage, hideLastPage)
  }, [isSmall, page, pageCount, pageTabCount, hideFirstPage, hideLastPage])

  const handlePageClick = useCallback(
    (pageNumber: number) => () => {
      onChange(pageNumber)
    },
    [onChange],
  )

  return (
    <Stack className={className} data-testid={dataTestId} direction="row">
      <Stack gap={1}>
        <Button
          accessibleLabel="Back"
          disabled={page <= 1 || disabled}
          onClick={goToPreviousPage}
          sentiment="primary"
          size={size}
          variant="outlined"
        >
          <ArrowLeftIcon />
        </Button>
      </Stack>
      <Stack className={paginationStyle.pageNumbersContainer} direction="row" gap={1}>
        {pageItems.map((item, index) =>
          item.type === 'ellipsis' ? (
            <Ellipsis disabled={disabled} key={`ellipsis-${index}`} size={size} />
          ) : (
            <Button
              aria-current={item.page === page}
              className={paginationStyle.pageButton[size]}
              disabled={disabled}
              key={item.page}
              onClick={handlePageClick(item.page)}
              sentiment={item.page === page ? 'primary' : 'neutral'}
              size={size}
              type="button"
              variant={item.page === page ? 'filled' : 'outlined'}
            >
              {item.page}
            </Button>
          ),
        )}
      </Stack>
      <Stack gap={1}>
        <Button
          accessibleLabel="Next"
          disabled={page >= pageCount || disabled}
          onClick={goToNextPage}
          sentiment="primary"
          size={size}
          variant="outlined"
        >
          <ArrowRightIcon />
        </Button>
      </Stack>
    </Stack>
  )
}
