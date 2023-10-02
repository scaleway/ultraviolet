import type { ReactNode } from 'react'
import { Checkbox } from '../Checkbox'
import { HeaderCell } from './HeaderCell'
import { useTableContext } from './TableContext'

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
        <HeaderCell width="24px">
          <Checkbox
            name="table-select-all-checkbox"
            value="all"
            aria-label="select all"
            checked={allRowSelectValue}
            onChange={allRowSelectValue === false ? selectAll : unselectAll}
            disabled={selectableRowCount === 0}
          />
        </HeaderCell>
      ) : null}
      {children}
    </tr>
  )
}
