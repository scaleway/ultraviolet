'use client'

import { List, Skeleton } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useOfferListContext } from '../OfferListProvider'
import { offerListCell, offerListLoadingCell } from '../styles.css'

export const Cell = ({
  children,
  className,
  'data-testid': dataTestId,
  colSpan,
}: ComponentProps<typeof List.Cell>) => {
  const { loading } = useOfferListContext()

  return loading ? (
    <List.Cell className={offerListLoadingCell}>
      <Skeleton data-state={loading} variant="line" />
    </List.Cell>
  ) : (
    <List.Cell
      className={`${className ? `${className} ` : ''}${offerListCell}`}
      colSpan={colSpan}
      data-testid={dataTestId}
    >
      {children}
    </List.Cell>
  )
}
