'use client'

import { List, Skeleton } from '@ultraviolet/ui'
import { cn } from '@ultraviolet/utils'
import type { ComponentProps } from 'react'
import { useOfferListContext } from '../OfferListProvider'
import { offerListCell, offerListLoadingCell } from '../styles.css'

export const Cell = ({
  children,
  className,
  'data-testid': dataTestId,
  colSpan,
  style,
}: ComponentProps<typeof List.Cell>) => {
  const { loading } = useOfferListContext()

  return loading ? (
    <List.Cell className={offerListLoadingCell} style={style}>
      <Skeleton data-state={loading} variant="line" />
    </List.Cell>
  ) : (
    <List.Cell
      className={cn(className, offerListCell)}
      colSpan={colSpan}
      data-testid={dataTestId}
      style={style}
    >
      {children}
    </List.Cell>
  )
}
