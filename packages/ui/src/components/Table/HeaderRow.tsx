'use client'

import { useTheme } from '@ultraviolet/themes'
import type { ReactNode } from 'react'
import { Checkbox } from '../Checkbox'
import { SELECTABLE_CHECKBOX_SIZE } from './constants'
import { HeaderCell } from './HeaderCell'
import { useTableContext } from './TableContext'

type HeaderRowProps = {
  children: ReactNode
  hasSelectAllColumn: boolean
}

export const HeaderRow = ({ children, hasSelectAllColumn }: HeaderRowProps) => {
  const { allRowSelectValue, selectAllHandler, selectedRowIds, expandButton } =
    useTableContext()
  const theme = useTheme()

  const selectableRowCount = Object.keys(selectedRowIds).length

  return (
    <tr role="row">
      {hasSelectAllColumn ? (
        <HeaderCell
          isCheckbox
          maxWidth={theme.sizing[SELECTABLE_CHECKBOX_SIZE]}
        >
          <Checkbox
            aria-label="select all"
            checked={allRowSelectValue}
            disabled={selectableRowCount === 0}
            name="table-select-all-checkbox"
            onChange={selectAllHandler}
            value="all"
          />
        </HeaderCell>
      ) : null}
      {expandButton ? <HeaderCell>{null}</HeaderCell> : null}
      {children}
    </tr>
  )
}
