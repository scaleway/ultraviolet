'use client'

import { cn } from '@ultraviolet/utils'
import type { ComponentProps } from 'react'
import { List } from '../../../components/List'
import { Skeleton } from '../../../components/Skeleton'
import { useOfferListContext } from '../OfferListProvider'
import { useOfferListRowContext } from './OfferListRowProvider'
import { offerListStyle } from '../styles.css'

export const Cell = ({
  children,
  className,
  'data-testid': dataTestId,
  colSpan,
  style,
}: ComponentProps<typeof List.Cell>) => {
  const { loading } = useOfferListContext()
  const { selected, banner } = useOfferListRowContext()

  return loading ? (
    <List.Cell className={offerListStyle.loadingCell} style={style}>
      <Skeleton data-state={loading} variant="line" />
    </List.Cell>
  ) : (
    <List.Cell
      className={cn(
        className,
        offerListStyle.cell,
        selected ? offerListStyle.selectedCell : '',
        banner ? offerListStyle.cellNoRadius : '',
      )}
      colSpan={colSpan}
      data-testid={dataTestId}
      style={style}
    >
      {children}
    </List.Cell>
  )
}
