'use client'

import styled from '@emotion/styled'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { Children, forwardRef, useEffect, useState } from 'react'
import { Cell } from './Cell'
import { HeaderCell } from './HeaderCell'
import { HeaderRow } from './HeaderRow'
import { ListProvider, useListContext } from './ListContext'
import { Row } from './Row'
import { SelectBar } from './SelectBar'
import { SkeletonRows } from './SkeletonRows'
import type { ColumnProps } from './types'

const TableContainerStyle = styled.div`
  min-width: 100%;
  width: 100%;
  overflow-x: auto;
`

const StyledTable = styled.table`
  width: 100%;
  box-sizing: content-box;
  gap: ${({ theme }) => theme.space['1']};
  border-spacing: 0 ${({ theme }) => theme.space['2']};
  position: relative;
`

// TODO: Get type optional type from omit values of ListContext
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

  return <TableContainerStyle>{children}</TableContainerStyle>
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
        <StyledTable className={className} ref={ref}>
          <HeaderRow hasSelectAllColumn={selectable}>
            {columns.map((column, index) => (
              <HeaderCell
                info={column.info}
                isOrdered={column.isOrdered}
                key={`header-column-${index}`}
                maxWidth={column.maxWidth}
                minWith={column.minWidth}
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
        </StyledTable>
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
