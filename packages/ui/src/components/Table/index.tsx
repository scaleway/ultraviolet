'use client'

import { cn } from '@ultraviolet/utils'
import type { CSSProperties, ReactNode } from 'react'
import { Children, forwardRef, useEffect, useState } from 'react'
import { useListContext } from '../List/ListContext'
import { listContainer } from '../List/styles.css'
import { Body } from './Body'
import { Cell } from './Cell'
import { Header } from './Header'
import { HeaderCell } from './HeaderCell'
import { HeaderRow } from './HeaderRow'
import { Row } from './Row'
import { SelectBar } from './SelectBar'
import { SkeletonRows } from './SkeletonRows'
import { table, tableBordered, tableStripped } from './styles.css'
import type { TableProviderProps } from './TableContext'
import { TableProvider, useTableContext } from './TableContext'
import type { ColumnProps } from './types'

// type OptionalKeys<T> = {
//   [K in keyof T]: {} extends Pick<T, K> ? K : never
// }[keyof T]

// type OptionalOnly<T> = Pick<T, OptionalKeys<T>>

// Note: Get type optional from omit values
type TableProps = Omit<
  TableProviderProps,
  | 'selectable'
  | 'loading'
  | 'bordered'
  | 'stripped'
  | 'autoCollapse'
  | 'columns'
  | 'expandButton'
> & {
  selectable?: boolean
  /**
   * Set it to true if you want to display a placeholder during loading
   */
  loading?: boolean
  bordered?: boolean
  stripped?: boolean
  expandable?: boolean
  /**
   * Auto collapse is collapsing expandable row when another is expanding
   */
  autoCollapse?: boolean
  expandButton?: boolean
  columns: ColumnProps[]
  style?: CSSProperties
}

const TableContainer = ({ children }: { children: ReactNode }) => {
  const [childrenMemory, setChildrenMemory] = useState<ReactNode[]>(
    Children.toArray(children),
  )

  const { setRefList } = useListContext()

  // Reset ref list when children change
  useEffect(() => {
    if (Children.toArray(children) !== childrenMemory) {
      setRefList([])
      setChildrenMemory(Children.toArray(children))
    }
    // oxlint-disable react/exhaustive-deps
  }, [children, setRefList])

  return <div className={listContainer}>{children}</div>
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
      onSelectedChange,
      style,
    },
    ref,
  ) => (
    <TableProvider
      autoCollapse={autoCollapse}
      bordered={bordered}
      columns={columns}
      expandButton={expandable}
      onSelectedChange={onSelectedChange}
      selectable={selectable}
      stripped={stripped}
    >
      <TableContainer>
        <table
          className={cn(
            table,
            stripped ? tableStripped : '',
            bordered ? tableBordered : '',
          )}
          ref={ref}
          style={style}
        >
          <Header>
            <HeaderRow hasSelectAllColumn={selectable}>
              {columns.map((column, index) => (
                <HeaderCell
                  align={column.align}
                  info={column.info}
                  isOrdered={column.isOrdered}
                  // biome-ignore lint/suspicious/noArrayIndexKey: to fix
                  key={`header-column-${index}`}
                  maxWidth={column.maxWidth}
                  minWidth={column.minWidth}
                  onOrder={column.onOrder}
                  orderDirection={column.orderDirection}
                  width={column.width}
                >
                  {column.label}
                </HeaderCell>
              ))}
            </HeaderRow>
          </Header>
          {loading ? (
            <Body>
              <SkeletonRows
                cols={columns.length}
                rows={5}
                selectable={selectable}
              />
            </Body>
          ) : (
            children
          )}
        </table>
      </TableContainer>
    </TableProvider>
  ),
)

/**
 * Table is a component that displays data in a tabular format.
 */
export const Table = Object.assign(BaseTable, {
  Body,
  Cell,
  Row,
  SelectBar,
  useTableContext,
})
