'use client'

import { List } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'
import { Cell } from './components/Cell'
import { Row } from './components/Row'
import { OfferListProvider } from './OfferListProvider'
import { offerList } from './styles.css'

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
  ['data-testid']?: string
  className?: string
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
  className,
  'data-testid': dataTestId,
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
      autoCollapse={autoCollapse}
      checkboxSelectedRows={checkboxSelectedRows}
      expandable={expandable}
      loading={loading}
      onChangeSelect={onChangeSelect}
      radioSelectedRow={radioSelectedRow}
      selectable={type}
      setCheckboxSelectedRows={setCheckboxSelectedRows}
      setRadioSelectedRow={setRadioSelectedRow}
    >
      <List
        autoCollapse={autoCollapse}
        className={`${className ? `${className} ` : ''}${offerList}`}
        columns={computedColumns}
        data-testid={dataTestId}
        expandable={false}
        selectable={false}
      >
        {children}
      </List>
    </OfferListProvider>
  )
}

OfferList.Row = Row
OfferList.Cell = Cell
