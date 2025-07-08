'use client'

import { List } from '@ultraviolet/ui'
import { ComponentProps, useEffect, useState } from 'react'
import { OfferListProvider } from './OfferListProvider'
import { Cell } from './components/Cell'
import { Row } from './components/Row'

type OfferListProps = Omit<
  ComponentProps<typeof List>,
  'selectable' | 'onSelectedChange'
> & {
  selectable?: 'radio' | 'checkbox'
  onChangeSelect?: (selected: string | string[]) => void
}

export const OfferList = ({
  expandable,
  selectable,
  columns,
  children,
  loading,
  autoCollapse,
  onChangeSelect,
}: OfferListProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const computedColumns =
    selectable === 'radio'
      ? [{ label: '' }, expandable ? { label: '' } : null, ...columns].filter(
          element => !!element,
        )
      : columns

  useEffect(() => onChangeSelect?.(selectedRows), [selectedRows])

  return (
    <OfferListProvider
      selectable={selectable}
      expandable={expandable}
      loading={loading}
      onChangeSelect={onChangeSelect}
    >
      <List
        expandable={expandable && selectable !== 'radio'}
        columns={computedColumns}
        autoCollapse={autoCollapse}
        selectable={selectable === 'checkbox'}
        onSelectedChange={setSelectedRows}
      >
        {children}
      </List>
    </OfferListProvider>
  )
}

OfferList.Row = Row
OfferList.Cell = Cell
