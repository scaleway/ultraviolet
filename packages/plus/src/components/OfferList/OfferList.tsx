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
  /**
   * Pre-selected rows (using their offerName). Must be an array when `type = "checkbox"`.
   */
  selected?: string | string[]
}

export const OfferList = ({
  expandable,
  type = 'radio',
  columns,
  children,
  loading,
  autoCollapse,
  selected,
  onChangeSelect,
}: OfferListProps) => {
  const [radioSelectedRow, setRadioSelectedRow] = useState<string | undefined>(
    typeof selected === 'string' ? selected : undefined,
  )
  const [checkboxSelectedRows, setCheckboxSelectedRows] = useState<string[]>(
    Array.isArray(selected) ? selected : [],
  )

  const computedColumns = [
    {
      label: '',
    },
    expandable ? { label: '' } : null,
    ...columns,
  ].filter(element => !!element)

  useEffect(() => {
    if (selected) {
      if (typeof selected === 'string' && type === 'radio') {
        setRadioSelectedRow(selected)
      }
      if (Array.isArray(selected) && type === 'checkbox') {
        setCheckboxSelectedRows(selected)
      }
    }
  }, [type, selected])

  return (
    <OfferListProvider
      selectable={type}
      expandable={expandable}
      loading={loading}
      onChangeSelect={onChangeSelect}
      autoCollapse={autoCollapse}
      setCheckboxSelectedRows={setCheckboxSelectedRows}
      setRadioSelectedRow={setRadioSelectedRow}
      checkboxSelectedRows={checkboxSelectedRows}
      radioSelectedRow={radioSelectedRow}
    >
      <StyledList
        expandable={false}
        columns={computedColumns}
        autoCollapse={autoCollapse}
        selectable={false}
      >
        {children}
      </StyledList>
    </OfferListProvider>
  )
}

OfferList.Row = Row
OfferList.Cell = Cell
