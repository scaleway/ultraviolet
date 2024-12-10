import { useTheme } from '@emotion/react'
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
import { EXPANDABLE_COLUMN_SIZE, SELECTABLE_CHECKBOX_SIZE } from './constants'

type StyledTableProps = {
  stripped: boolean
  bordered: boolean
  template: string
}
const StyledTable = styled('table', {
  shouldForwardProp: prop =>
    !['bordered', 'stripped', 'template'].includes(prop),
})<StyledTableProps>`
  width: 100%;
  box-sizing: content-box;
  border-collapse: collapse;

  [role="row"],
  [role="button row"] {
    width: 100%;
    display: table-row;
    vertical-align: middle;
  }

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
  label?: ReactNode
  width?: string
  minWidth?: string
  maxWidth?: string
  info?: string
  align?: 'left' | 'center' | 'right'
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
  expandable?: boolean
  /**
   * Auto collapse is collapsing expandable row when another is expanding
   * */
  autoCollapse?: boolean
}

export const BaseTable = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      selectable = false,
      expandable = false,
      children,
      columns,
      loading,
      bordered = false,
      stripped = false,
      autoCollapse = false,
    },
    ref,
  ) => {
    const theme = useTheme()

    const computeTemplate = `${
      selectable ? `${theme.sizing[SELECTABLE_CHECKBOX_SIZE]} ` : ''
    }${expandable ? `${theme.sizing[EXPANDABLE_COLUMN_SIZE]} ` : ''}${columns
      .map(({ width }) => width ?? 'minmax(0, 1fr)')
      .join(' ')}`

    return (
      <TableProvider
        selectable={selectable}
        expandButton={expandable}
        stripped={stripped}
        bordered={bordered}
        autoCollapse={autoCollapse}
      >
        <StyledTable
          ref={ref}
          stripped={stripped}
          bordered={bordered}
          template={computeTemplate}
        >
          <Header>
            <HeaderRow hasSelectAllColumn={selectable}>
              {columns.map((column, index) => (
                <HeaderCell
                  key={`header-column-${index}`}
                  isOrdered={column.isOrdered}
                  orderDirection={column.orderDirection}
                  onOrder={column.onOrder}
                  width={column.width}
                  minWidth={column.minWidth}
                  maxWidth={column.maxWidth}
                  info={column.info}
                  align={column.align}
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
    )
  },
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
