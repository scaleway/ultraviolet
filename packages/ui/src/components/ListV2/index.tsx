import type { ComponentProps, ReactNode } from 'react'
import type { XOR } from '../../types'
import { Stack } from '../Stack'
import { ListBody } from './ListBody'
import { ListCell } from './ListCell'
import { ListProvider } from './ListContext'
import { ListExpandable } from './ListExpandable'
import { ListHeader } from './ListHeader'
import { ListHeaderRow } from './ListHeaderRow'
import { ListHeaders } from './ListHeaders'
import { ListLoadingPlaceholder } from './ListLoadingPlaceholder'
import { ListRow } from './ListRow'

type ListColumn = Omit<
  ComponentProps<typeof ListHeader>,
  'children' | 'colSpan'
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
   * Auto close opened expandable row when another is opening
   * */
  autoClose?: boolean
  showExpandArrow?: boolean
  columns?: ListColumn[]
  template?: string
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
  template,
  selectedIds,
  onSelectedIdsChange,
  isLoading,
  autoClose,
  showExpandArrow = false,
  className,
}: ListProps) => {
  if (columns) {
    const computedTemplate = columns
      .map(({ width }) => width ?? '1fr')
      .join(' ')

    return (
      <ListProvider
        autoClose={autoClose}
        showExpandArrow={showExpandArrow}
        template={computedTemplate}
        selectedIds={selectedIds}
        onSelectedIdsChange={onSelectedIdsChange}
      >
        <Stack className={className} gap={1} role="table">
          <ListHeaders>
            <ListHeaderRow>
              {columns.map(
                (
                  { label, onClick, sort, className: columnClassName, id },
                  index,
                ) => (
                  <ListHeader
                    onClick={onClick}
                    sort={sort}
                    className={columnClassName}
                    key={id || `column-${index}`}
                    id={id}
                  >
                    {label}
                  </ListHeader>
                ),
              )}
            </ListHeaderRow>
          </ListHeaders>
          {isLoading ? (
            <ListBody>
              <ListLoadingPlaceholder cols={columns.length} />
            </ListBody>
          ) : (
            children
          )}
        </Stack>
      </ListProvider>
    )
  }

  return (
    <ListProvider
      template={template}
      selectedIds={selectedIds}
      onSelectedIdsChange={onSelectedIdsChange}
    >
      <Stack gap={1} role="table">
        {isLoading ? (
          <ListBody>
            <ListLoadingPlaceholder cols={template ? 1 : 12} />
          </ListBody>
        ) : (
          children
        )}
      </Stack>
    </ListProvider>
  )
}

List.Row = ListRow
List.Body = ListBody
List.Cell = ListCell
List.Headers = ListHeaders
List.HeaderRow = ListHeaderRow
List.Header = ListHeader
List.Placeholder = ListLoadingPlaceholder
List.Expandable = ListExpandable
