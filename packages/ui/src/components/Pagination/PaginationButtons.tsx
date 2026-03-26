'use client'

import { ArrowLeftIcon } from '@ultraviolet/icons/ArrowLeftIcon'
import { ArrowRightIcon } from '@ultraviolet/icons/ArrowRightIcon'
import { useCallback, useMemo } from 'react'

import { Button } from '../Button'
import { Stack } from '../Stack'

import { getPageNumbers } from './getPageNumbers'
import { MakeButton } from './PaginationButton'
import { paginationStyle } from './styles.css'

type PaginationButtonsProps = {
  page: number
  disabled: boolean
  onChange: (newPage: number) => void
  pageCount: number
  pageTabCount?: number
  className?: string
  'data-testid'?: string
  perPage: boolean
}

export const PaginationButtons = ({
  page,
  disabled,
  onChange,
  pageCount,
  pageTabCount,
  'data-testid': dataTestId,
  className,
  perPage,
}: PaginationButtonsProps) => {
  const goToNextPage = useCallback(() => {
    onChange(page + 1)
  }, [onChange, page])

  const goToPreviousPage = useCallback(() => {
    onChange(page - 1)
  }, [onChange, page])

  const pageNumbersToDisplay = useMemo(
    () => (pageCount > 1 ? getPageNumbers(page, pageCount, pageTabCount) : [1]),
    [page, pageCount, pageTabCount],
  )

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
          aria-label="Back"
          disabled={page <= 1 || disabled}
          onClick={goToPreviousPage}
          sentiment="primary"
          size={perPage ? 'small' : 'medium'}
          variant="outlined"
        >
          <ArrowLeftIcon />
        </Button>
      </Stack>
      <Stack
        className={paginationStyle.pageNumbersContainer}
        direction="row"
        gap={1}
      >
        {pageNumbersToDisplay.map((pageNumber, index) => (
          <MakeButton
            disabled={disabled}
            handlePageClick={handlePageClick}
            hasEllipsisBefore={
              !(
                index === 0 ||
                pageNumbersToDisplay[index - 1] === pageNumber - 1
              )
            }
            key={pageNumber}
            page={page}
            pageNumber={pageNumber}
            perPage={perPage}
          />
        ))}
      </Stack>
      <Stack gap={1}>
        <Button
          aria-label="Next"
          disabled={page >= pageCount || disabled}
          onClick={goToNextPage}
          sentiment="primary"
          size={perPage ? 'small' : 'medium'}
          variant="outlined"
        >
          <ArrowRightIcon />
        </Button>
      </Stack>
    </Stack>
  )
}
