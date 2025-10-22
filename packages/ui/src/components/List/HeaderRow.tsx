'use client'

import type { ReactNode } from 'react'
import { Checkbox } from '../Checkbox'
import { HeaderCell } from './HeaderCell'
import { useListContext } from './ListContext'
import { listHeaderRow, listNoPaddingHeaderCell } from './styles.css'

type RowProps = {
  hasSelectAllColumn: boolean
  children: ReactNode
}

export const HeaderRow = ({ children, hasSelectAllColumn }: RowProps) => {
  const { allRowSelectValue, selectAllHandler, selectedRowIds, expandButton } =
    useListContext()

  const selectableRowCount = Object.keys(selectedRowIds).length

  return (
    <thead>
      <tr className={listHeaderRow}>
        {hasSelectAllColumn ? (
          <HeaderCell className={listNoPaddingHeaderCell}>
            <Checkbox
              aria-label="select all"
              checked={allRowSelectValue}
              disabled={selectableRowCount === 0}
              name="list-select-checkbox"
              onChange={selectAllHandler}
              value="all"
            />
          </HeaderCell>
        ) : null}
        {expandButton ? (
          <HeaderCell className={listNoPaddingHeaderCell}>{null}</HeaderCell>
        ) : null}
        {children}
      </tr>
    </thead>
  )
}
