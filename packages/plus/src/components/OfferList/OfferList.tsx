'use client'

import styled from '@emotion/styled'
import { List } from '@ultraviolet/ui'
import { useEffect, useState } from 'react'
import type { ComponentProps } from 'react'
import { OfferListProvider } from './OfferListProvider'
import { Cell } from './components/Cell'
import { Row } from './components/Row'

const StyledList = styled(List)`
   td:first-child,
   th:first-child {
    width: ${({ theme }) => theme.sizing[700]};
    min-width:  ${({ theme }) => theme.sizing[700]};
    max-width:  ${({ theme }) => theme.sizing[700]};
  } 
`

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
  type = 'radio',
  columns,
  children,
  loading,
  autoCollapse,
  onChangeSelect,
}: OfferListProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const computedColumns = [
    {
      label: '',
    },
    expandable ? { label: '' } : null,
    ...columns,
  ].filter(element => !!element)

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
      <StyledList
        expandable={false}
        columns={computedColumns}
        autoCollapse={autoCollapse}
        onSelectedChange={setSelectedRows}
        selectable={false}
      >
        {children}
      </StyledList>
    </OfferListProvider>
  )
}

OfferList.Row = Row
OfferList.Cell = Cell
