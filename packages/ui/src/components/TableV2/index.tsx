import styled from '@emotion/styled'
import type { ComponentProps, ReactNode } from 'react'
import { forwardRef } from 'react'
import { Body } from './Body'
import { Cell } from './Cell'
import { Header } from './Header'
import { HeaderCell } from './HeaderCell'
import { HeaderRow } from './HeaderRow'
import { Row } from './Row'
import { SelectBar } from './SelectBar'
import { SkeletonRows } from './SkeletonRows'
import { TableProvider, useTableContext } from './TableContext'

type StyledTableProps = {
  stripped: boolean
  separated: boolean
}
const StyledTable = styled('table', {
  shouldForwardProp: prop => !['separated', 'stripped'].includes(prop),
})<StyledTableProps>`
  width: 100%;
  box-sizing: content-box;
  border-collapse: collapse;

  ${({ theme, stripped, separated }) => `
  ${
    stripped
      ? `& tbody tr:nth-of-type(even) {
    background: ${theme.colors.neutral.backgroundStrong};
  }`
      : ''
  }

  ${
    separated
      ? `& tbody tr {
    border-bottom: 1px solid ${theme.colors.neutral.borderWeak};
  }`
      : ''
  }
  `}
`

type ColumnProps = Pick<
  ComponentProps<typeof HeaderCell>,
  'isOrdered' | 'onOrder' | 'orderDirection'
> & {
  label?: string
  width?: string
  minWidth?: string
  maxWidth?: string
}

type TableV2Props = {
  areRowSelectable?: boolean
  columns: ColumnProps[]
  children: ReactNode
  /**
   * Set it to true if you want to display a placeholder during loading
   * */
  isLoading?: boolean
  separated?: boolean
  stripped?: boolean
}

export const BaseTableV2 = forwardRef<HTMLTableElement, TableV2Props>(
  (
    {
      areRowSelectable = false,
      children,
      columns,
      isLoading,
      separated = false,
      stripped = false,
    },
    ref,
  ) => (
    <TableProvider
      areRowSelectable={areRowSelectable}
      stripped={stripped}
      separated={separated}
    >
      <StyledTable ref={ref} stripped={stripped} separated={separated}>
        <Header>
          <HeaderRow hasSelectAllColumn={areRowSelectable}>
            {columns.map((column, index) => (
              <HeaderCell
                // eslint-disable-next-line react/no-array-index-key
                key={`header-column-${index}`}
                isOrdered={column.isOrdered}
                orderDirection={column.orderDirection}
                onOrder={column.onOrder}
                width={column.width}
                minWidth={column.minWidth}
                maxWidth={column.maxWidth}
              >
                {column.label}
              </HeaderCell>
            ))}
          </HeaderRow>
        </Header>
        {isLoading ? (
          <Body>
            <SkeletonRows
              areRowSelectable={areRowSelectable}
              rows={5}
              cols={columns.length}
            />
          </Body>
        ) : (
          children
        )}
      </StyledTable>
    </TableProvider>
  ),
)

export const TableV2 = Object.assign(BaseTableV2, {
  Body,
  Row,
  Cell,
  useTableContext,
  SelectBar,
})
