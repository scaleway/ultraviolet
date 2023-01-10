import type { ComponentProps, ReactNode } from 'react'
import { Children, isValidElement, useMemo, useRef } from 'react'
import type { XOR } from '../../types'
import { Stack } from '../Stack'
import { ListCell } from './ListCell'
import { ListProvider } from './ListContext'
import { ListHeaderCell } from './ListHeaderCell'
import { ListHeaderRow } from './ListHeaderRow'
import { ListLoadingSkeleton } from './ListLoadingSkeleton'
import {
  EXPANDABLE_ARROW_CELL_WIDTH,
  ListRow,
  SELECTABLE_CELL_WIDTH,
} from './ListRow'

type ListColumn = Pick<
  ComponentProps<typeof ListHeaderCell>,
  'sort' | 'onClick' | 'className'
> & {
  label: ReactNode
  width?: string
  id?: string
}

type CommonListProps = {
  children: ReactNode
  /**
   * Set it to true if you want to display a placeholder during loading
   * */
  isLoading?: boolean
  /**
   * Auto close is closing expandable row when another is opening
   * */
  autoClose?: boolean
  columns: ListColumn[]
  className?: string
}
type ListProps = XOR<
  [
    CommonListProps,
    CommonListProps & {
      // Multi Select props
      selectedIds: string[]
      onSelectedIdsChange: (selectedIds: string[]) => void
    },
  ]
>

export const List = ({
  children,
  columns,
  selectedIds,
  onSelectedIdsChange,
  isLoading,
  autoClose,
  className,
}: ListProps) => {
  const hasExpandableRowsRef = useRef(false)
  const rowWithExpandable = useMemo(
    () =>
      Children.toArray(children).find(child => {
        if (
          isValidElement<{ expandable?: ReactNode; isExpanded?: boolean }>(
            child,
          ) &&
          child.props.expandable !== undefined &&
          child.props.isExpanded === undefined
        ) {
          return true
        }

        return false
      }),
    [children],
  )
  if (
    hasExpandableRowsRef.current === false &&
    rowWithExpandable !== undefined
  ) {
    hasExpandableRowsRef.current = true
  }

  const computedTemplate = `${
    onSelectedIdsChange ? `${SELECTABLE_CELL_WIDTH}px ` : ''
  }${
    hasExpandableRowsRef.current ? `${EXPANDABLE_ARROW_CELL_WIDTH}px ` : ''
  }${columns.map(({ width }) => width ?? '1fr').join(' ')}`

  return (
    <ListProvider
      autoClose={autoClose}
      template={computedTemplate}
      selectedIds={selectedIds}
      onSelectedIdsChange={onSelectedIdsChange}
    >
      <Stack className={className} gap={1} role="table">
        {/* Header */}
        <div role="rowgroup">
          <ListHeaderRow hasExpandableCell={hasExpandableRowsRef.current}>
            {columns.map(
              (
                { label, onClick, sort, className: columnClassName, id },
                index,
              ) => (
                <ListHeaderCell
                  onClick={onClick}
                  sort={sort}
                  className={columnClassName}
                  key={id || `column-${index}`}
                  id={id}
                >
                  {label}
                </ListHeaderCell>
              ),
            )}
          </ListHeaderRow>
        </div>
        {/* Body */}
        <Stack gap={2} role="rowgroup" className={className}>
          {isLoading ? <ListLoadingSkeleton cols={columns.length} /> : children}
        </Stack>
      </Stack>
    </ListProvider>
  )
}

List.Row = ListRow
List.Cell = ListCell
List.Skeleton = ListLoadingSkeleton
