'use client'

import { List } from '@ultraviolet/ui'
import { useEffect, useState } from 'react'
import type { ComponentProps } from 'react'
import { OfferListProvider } from './OfferListProvider'
import { Cell } from './components/Cell'
import { Row } from './components/Row'

type OfferListProps = Omit<
  ComponentProps<typeof List>,
  'selectable' | 'onSelectedChange'
> & {
  /**
   * Make offerList selectable by choosing its type
   */
  type?: 'radio' | 'checkbox'
  onChangeSelect?: (selected: string | string[]) => void
}

export const OfferList = ({
  expandable,
  type,
  columns,
  children,
  loading,
  autoCollapse,
  onChangeSelect,
}: OfferListProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const computedColumns =
    type === 'radio'
      ? [{ label: '' }, expandable ? { label: '' } : null, ...columns].filter(
          element => !!element,
        )
      : columns

  useEffect(
    () => onChangeSelect?.(selectedRows),
    [selectedRows, onChangeSelect],
  )

  return (
    <OfferListProvider
      selectable={type}
      expandable={expandable}
      loading={loading}
      onChangeSelect={onChangeSelect}
      autoCollapse={autoCollapse}
    >
      <List
        expandable={expandable && type !== 'radio'}
        columns={computedColumns}
        autoCollapse={autoCollapse}
        selectable={type === 'checkbox'}
        onSelectedChange={setSelectedRows}
      >
        {children}
      </List>
    </OfferListProvider>
  )
}

OfferList.Row = Row
OfferList.Cell = Cell
