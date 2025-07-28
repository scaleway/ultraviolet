'use client'

import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Checkbox } from '../Checkbox'
import { SELECTABLE_CHECKBOX_SIZE } from './constants'
import { HeaderCell } from './HeaderCell'
import { useListContext } from './ListContext'

const StyledHeaderRow = styled.tr`
  /* List itself also apply style about common templating between HeaderRow and other Rows */
  display: table-row;
  vertical-align: middle;
  padding: 0 ${({ theme }) => theme.space['2']};
`

const NoPaddingHeaderCell = styled(HeaderCell)`
  padding: 0;

  &:first-of-type {
    padding-left: ${({ theme }) => theme.space['2']};
  }

  max-width: ${({ theme }) => theme.sizing[SELECTABLE_CHECKBOX_SIZE]};
`

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
      <StyledHeaderRow>
        {hasSelectAllColumn ? (
          <NoPaddingHeaderCell>
            <Checkbox
              name="list-select-checkbox"
              value="all"
              aria-label="select all"
              checked={allRowSelectValue}
              onChange={selectAllHandler}
              disabled={selectableRowCount === 0}
            />
          </NoPaddingHeaderCell>
        ) : null}
        {expandButton ? (
          <NoPaddingHeaderCell>{null}</NoPaddingHeaderCell>
        ) : null}
        {children}
      </StyledHeaderRow>
    </thead>
  )
}
