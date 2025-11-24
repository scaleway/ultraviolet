'use client'

import type { CSSProperties, Dispatch, ReactNode, SetStateAction } from 'react'
import { forwardRef, useEffect, useRef } from 'react'
import { Cell } from './Cell'
import { HeaderCell } from './HeaderCell'
import { HeaderRow } from './HeaderRow'
import { ListProvider, useListContext } from './ListContext'
import { Row } from './Row'
import { SelectBar } from './SelectBar'
import { SkeletonRows } from './SkeletonRows'
import { list, listContainer } from './styles.css'
import type { ColumnProps } from './types'

// Note: Get type optional type from omit values of ListContext
type ListProps = {
  expandable?: boolean
  selectable?: boolean
  columns: ColumnProps[]
  children: ReactNode
  /**
   * Set it to true if you want to display a placeholder during loading
   * */
  loading?: boolean
  /**
   * Auto collapse is collapsing expandable row when another is expanding
   * */
  autoCollapse?: boolean
  /**
   * Action when selection changes (get the list of selected rows)
   */
  onSelectedChange?: Dispatch<SetStateAction<string[]>>
  className?: string
  style?: CSSProperties
}

const TableContainer = ({ children }: { children: ReactNode }) => {
  const childrenRef = useRef(children)
  const { setRefList } = useListContext()

  // Reset ref list when children change
  useEffect(() => {
    if (children !== childrenRef.current) {
      setRefList([])
      childrenRef.current = children
    }
  }, [children, setRefList])

  return <div className={listContainer}>{children}</div>
}

const BaseList = forwardRef<HTMLTableElement, ListProps>(
  (
    {
      expandable = false,
      selectable = false,
      columns,
      children,
      loading,
      autoCollapse = false,
      onSelectedChange,
      className,
      style,
    },
    ref,
  ) => (
    <ListProvider
      autoCollapse={autoCollapse}
      columns={columns}
      expandButton={expandable}
      onSelectedChange={onSelectedChange}
      selectable={selectable}
    >
      <TableContainer>
        <table
          className={`${className ? `${className} ` : ''}${list}`}
          ref={ref}
          style={style}
        >
          <HeaderRow hasSelectAllColumn={selectable}>
            {columns.map((column, index) => (
              <HeaderCell
                info={column.info}
                isOrdered={column.isOrdered}
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
          <tbody>
            {loading ? (
              <SkeletonRows
                cols={columns.length}
                rows={5}
                selectable={selectable}
              />
            ) : (
              children
            )}
          </tbody>
        </table>
      </TableContainer>
    </ListProvider>
  ),
)

/**
 * List is a component that displays a list of items based on the columns you provide and the data you pass.
 */
export const List = Object.assign(BaseList, {
  Cell,
  Row,
  SelectBar,
  useListContext,
})
