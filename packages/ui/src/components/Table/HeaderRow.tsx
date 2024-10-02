import type { ReactNode } from 'react'
import { Checkbox } from '../Checkbox'
import { HeaderCell } from './HeaderCell'
import { useTableContext } from './TableContext'

type HeaderRowProps = {
  children: ReactNode
  hasSelectAllColumn: boolean
}

export const HeaderRow = ({ children, hasSelectAllColumn }: HeaderRowProps) => {
  const {
    allRowSelectValue,
    selectAll,
    unselectAll,
    selectedRowIds,
    expandButton,
  } = useTableContext()

  const selectableRowCount = Object.keys(selectedRowIds).length

  return (
    <tr role="row">
      {hasSelectAllColumn ? (
        <HeaderCell>
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
      {expandButton ? <HeaderCell>{null}</HeaderCell> : null}
      {children}
    </tr>
  )
}
