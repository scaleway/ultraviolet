import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Checkbox } from '../Checkbox'
import { HeaderCell } from './HeaderCell'
import { useListContext } from './ListContext'
import { EXPANDABLE_COLUMN_SIZE, SELECTABLE_CHECKBOX_SIZE } from './constants'

const StyledHeaderRow = styled.tr`
  /* List itself also apply style about common templating between HeaderRow and other Rows */
  display: table-row;
  vertical-align: middle;
  padding: 0 ${({ theme }) => theme.space['2']};

  &:before {
    content: "";
    position: absolute;
    top: 0; /* Adjust based on border width and spacing */
    left: 0;
    right: 0;
    bottom: 0; /* Adjust based on border width and spacing */
    border: 1px solid transparent;
    border-radius: ${({ theme }) => theme.radii.default};
    pointer-events: none;
    transition:
      box-shadow 200ms ease,
      border-color 200ms ease;
  }
`

const NoPaddingHeaderCell = styled(HeaderCell)`
  padding: 0;

  &:first-of-type {
    padding-left: ${({ theme }) => theme.space['2']};
  }
`

type RowProps = {
  hasSelectAllColumn: boolean
  children: ReactNode
}

export const HeaderRow = ({ children, hasSelectAllColumn }: RowProps) => {
  const {
    allRowSelectValue,
    selectAll,
    unselectAll,
    selectedRowIds,
    expandButton,
  } = useListContext()

  const theme = useTheme()

  const selectableRowCount = Object.keys(selectedRowIds).length

  return (
    <thead>
      <StyledHeaderRow>
        {hasSelectAllColumn ? (
          <NoPaddingHeaderCell
            maxWidth={theme.sizing[SELECTABLE_CHECKBOX_SIZE]}
          >
            <Checkbox
              name="list-select-checkbox"
              value="all"
              aria-label="select all"
              checked={allRowSelectValue}
              onChange={allRowSelectValue === false ? selectAll : unselectAll}
              disabled={selectableRowCount === 0}
            />
          </NoPaddingHeaderCell>
        ) : null}
        {expandButton ? (
          <NoPaddingHeaderCell maxWidth={theme.sizing[EXPANDABLE_COLUMN_SIZE]}>
            {null}
          </NoPaddingHeaderCell>
        ) : null}
        {children}
      </StyledHeaderRow>
    </thead>
  )
}
