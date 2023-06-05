import type { ReactNode } from 'react'
import { Checkbox } from '../Checkbox'
import { HeaderCell } from './HeaderCell'
import { useTableContext } from './TableContext'

export const SELECT_CHECKBOX_SIZE = 24

type HeaderRowProps = {
  children: ReactNode
  hasSelectAllColumn: boolean
}

export const HeaderRow = ({ children, hasSelectAllColumn }: HeaderRowProps) => {
  const { allRowSelectValue, selectAll, unselectAll, selectedRowIds } =
    useTableContext()

  const selectableRowCount = Object.keys(selectedRowIds).length

  return (
    <tr>
      {hasSelectAllColumn ? (
        <HeaderCell width={`${SELECT_CHECKBOX_SIZE}px`}>
          <Checkbox
            name="table-select-all-checkbox"
            value="all"
            aria-label="select all"
            checked={allRowSelectValue}
            onChange={allRowSelectValue === false ? selectAll : unselectAll}
            disabled={selectableRowCount === 0}
            size={SELECT_CHECKBOX_SIZE}
          />
        </HeaderCell>
      ) : null}
      {children}
    </tr>
  )
}
