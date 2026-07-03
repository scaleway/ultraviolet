'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { Stack } from '../Stack'
import { PaginationButtons } from './PaginationButtons'
import { PerPage } from './PerPage'

type PaginationProps = {
  /**
    Event function called when changing the page
  */
  onChange: (newPage: number) => void
  /**
    The current page (must be between 1 and pageCount included, otherwhile onChange will be called with a correct value)
  */
  page: number
  /**
    Number of page you have
  */
  pageCount: number
  /**
    How many page button you want to have before truncation
  */
  pageTabCount?: number
  hideFirstPage?: boolean
  hideLastPage?: boolean
  /**
    Disable all buttons
  */
  disabled?: boolean
  className?: string
  style?: CSSProperties
  'data-testid'?: string
} & (
  | {
      /**
       * Number of elements to show per page
       */
      perPage: number
      /**
       * A function that is triggered when perPage changes
       */
      onChangePerPage?: (perPage: number) => void
      /**
       * defines the localized text to display when "perPage" is defined"
       */
      perPageText?: string
      /**
       * Defines the localized text to display the number of items in the list
       */
      numberOfItemsText?: string
      /**
       * Number of items in the list
       */
      numberOfItems: number
      /**
       * Defines the target element for the perPage dropdown menu
       */
      perPagePortalTarget?: HTMLElement
      size?: never
    }
  | {
      perPage?: never
      onChangePerPage?: never
      perPageText?: never
      numberOfItemsText?: never
      numberOfItems?: never
      perPagePortalTarget?: never
      size?: 'small' | 'medium'
    }
)

/**
 * Pagination is a component to navigate between pages, it is composed of 2 buttons to go to the previous and next page,
 * and a list of buttons to go to a specific page.
 */
export const Pagination = ({
  disabled = false,
  page,
  pageCount,
  onChange,
  pageTabCount = 5,
  className,
  perPage,
  onChangePerPage,
  perPageText,
  numberOfItemsText,
  numberOfItems,
  perPagePortalTarget,
  hideFirstPage,
  hideLastPage,
  size = 'medium',
  'data-testid': dataTestId,
  style,
}: PaginationProps) => {
  const [perPageComputed, setPerPage] = useState(perPage ?? 10)

  useEffect(() => {
    if (page < 1) {
      onChange(1)
    }
    if (page > pageCount) {
      onChange(pageCount)
    }
  }, [page, pageCount, onChange])

  useEffect(() => {
    if (perPage) {
      setPerPage(perPage)
    }
  }, [perPage])

  return (
    <Stack direction="row" justifyContent="space-between" style={style}>
      {perPage ? (
        <PerPage
          numberOfItems={numberOfItems}
          numberOfItemsText={numberOfItemsText}
          onChangePerPage={onChangePerPage}
          page={page}
          perPage={perPageComputed}
          perPageText={perPageText}
          portalTarget={perPagePortalTarget}
          setPerPage={setPerPage}
        />
      ) : null}
      <PaginationButtons
        className={className}
        data-testid={dataTestId}
        disabled={disabled}
        onChange={onChange}
        page={page}
        pageCount={pageCount}
        pageTabCount={pageTabCount}
        size={perPage ? 'small' : size}
        hideFirstPage={hideFirstPage}
        hideLastPage={hideLastPage}
      />
    </Stack>
  )
}

Pagination.displayName = 'Pagination'
