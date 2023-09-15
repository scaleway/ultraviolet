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
  bordered: boolean
}
const StyledTable = styled('table', {
  shouldForwardProp: prop => !['bordered', 'stripped'].includes(prop),
})<StyledTableProps>`
  width: 100%;
  box-sizing: content-box;
  border-collapse: collapse;

  ${({ theme, stripped, bordered }) => `
  ${
    stripped
      ? `& tbody tr:nth-of-type(even) {
    background: ${theme.colors.neutral.backgroundWeak};
  }`
      : ''
  }

  ${
    bordered
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
  info?: string
}

type TableProps = {
  selectable?: boolean
  columns: ColumnProps[]
  children: ReactNode
  /**
   * Set it to true if you want to display a placeholder during loading
   * */
  loading?: boolean
  bordered?: boolean
  stripped?: boolean
}

export const BaseTable = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      selectable = false,
      children,
      columns,
      loading,
      bordered = false,
      stripped = false,
    },
    ref,
  ) => (
    <TableProvider
      selectable={selectable}
      stripped={stripped}
      bordered={bordered}
    >
      <StyledTable ref={ref} stripped={stripped} bordered={bordered}>
        <Header>
          <HeaderRow hasSelectAllColumn={selectable}>
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
                info={column.info}
              >
                {column.label}
              </HeaderCell>
            ))}
          </HeaderRow>
        </Header>
        {loading ? (
          <Body>
            <SkeletonRows
              selectable={selectable}
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

/**
 * Table is a component that displays data in a tabular format.
 */
export const Table = Object.assign(BaseTable, {
  Body,
  Row,
  Cell,
  useTableContext,
  SelectBar,
})
