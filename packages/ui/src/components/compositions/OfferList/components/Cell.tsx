'use client'

import { cn } from '@ultraviolet/utils'

import { List } from '../../../List'
import { Skeleton } from '../../../Skeleton'
import { useOfferListContext } from '../OfferListProvider'
import { offerListStyle } from '../styles.css'

import { useOfferListRowContext } from './OfferListRowProvider'

import type { ComponentProps } from 'react'

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
