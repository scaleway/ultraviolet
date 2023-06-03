import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Checkbox } from '../Checkbox'
import { HeaderCell } from './HeaderCell'
import { useListContext } from './ListContext'

const StyledHeaderRow = styled.div`
  /* List itself also apply style about common templating between HeaderRow and other Rows */
  column-gap: ${({ theme }) => theme.space['2']};
  padding: 0 ${({ theme }) => theme.space['2']};
`

type RowProps = {
  hasSelectAllColumn: boolean
  children: ReactNode
}

export const HeaderRow = ({ children, hasSelectAllColumn }: RowProps) => {
  const { allRowSelectValue, selectAll, unselectAll, selectedRowIds } =
    useListContext()

  const selectableRowCount = Object.keys(selectedRowIds).length

  return (
    <StyledHeaderRow role="row">
      {hasSelectAllColumn ? (
        <HeaderCell>
          <Checkbox
            name="list-select-checkbox"
            value="all"
            aria-label="select all"
            checked={allRowSelectValue}
            onChange={allRowSelectValue === false ? selectAll : unselectAll}
            disabled={selectableRowCount === 0}
          />
        </HeaderCell>
      ) : null}
      {children}
    </StyledHeaderRow>
  )
}
