'use client'

import { ArrowLeftIcon } from '@ultraviolet/icons/ArrowLeftIcon'
import { ArrowRightIcon } from '@ultraviolet/icons/ArrowRightIcon'
import { useCallback, useMemo } from 'react'
import type { HTMLAttributes, ReactElement } from 'react'
import { Button } from '../../Action/Button'
import { Stack } from '../../Layout/Stack'
import { Ellipsis } from './Ellipsis'
import { getPageItems } from './getPageItems'
import { paginationStyle } from './styles.css'

export type PaginationLinkProps = HTMLAttributes<HTMLElement> & {
  href: string
}

export type PaginationRenderLink = (page: number, props: PaginationLinkProps) => ReactElement

type PaginationButtonsProps = {
  page: number
  disabled: boolean
  onChange?: (newPage: number) => void
  pageCount: number
  pageTabCount: number
  className?: string
  'data-testid'?: string
  hideFirstPage?: boolean
  hideLastPage?: boolean
  isSmall: boolean
  size: 'small' | 'medium'
  hrefBuilder?: (page: number) => string
  renderLink?: PaginationRenderLink
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
  hrefBuilder,
  renderLink,
}: PaginationButtonsProps) => {
  const goToNextPage = useCallback(() => {
    onChange?.(page + 1)
  }, [onChange, page])

  const goToPreviousPage = useCallback(() => {
    onChange?.(page - 1)
  }, [onChange, page])

  const pageItems = useMemo(() => {
    const buttonsInCenter = isSmall ? 1 : 3
    return getPageItems(page, pageCount, pageTabCount, buttonsInCenter, hideFirstPage, hideLastPage)
  }, [isSmall, page, pageCount, pageTabCount, hideFirstPage, hideLastPage])

  const handlePageClick = useCallback(
    (pageNumber: number) => () => {
      onChange?.(pageNumber)
    },
    [onChange],
  )

  const getLinkProps = useCallback(
    (targetPage: number) => {
      const href = hrefBuilder?.(targetPage)
      if (!href) {
        return {}
      }
      if (renderLink) {
        return {
          render: (props: HTMLAttributes<HTMLElement>) => renderLink(targetPage, { ...props, href }),
        }
      }
      return { href }
    },
    [hrefBuilder, renderLink],
  )

  return (
    <Stack className={className} data-testid={dataTestId} direction="row">
      <Stack gap={1}>
        <Button
          accessibleLabel="Back"
          disabled={page <= 1 || disabled}
          onClick={hrefBuilder ? undefined : goToPreviousPage}
          {...(hrefBuilder && page > 1 ? getLinkProps(page - 1) : {})}
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
              aria-current={item.page === page ? 'page' : undefined}
              className={paginationStyle.pageButton[size]}
              disabled={disabled}
              key={item.page}
              onClick={hrefBuilder ? undefined : handlePageClick(item.page)}
              {...(hrefBuilder ? getLinkProps(item.page) : {})}
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
          onClick={hrefBuilder ? undefined : goToNextPage}
          {...(hrefBuilder && page < pageCount ? getLinkProps(page + 1) : {})}
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
