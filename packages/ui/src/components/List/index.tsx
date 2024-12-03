import styled from '@emotion/styled'
import type {
  ComponentProps,
  Dispatch,
  ForwardedRef,
  ReactNode,
  SetStateAction,
} from 'react'
import { forwardRef } from 'react'
import { Cell } from './Cell'
import { HeaderCell } from './HeaderCell'
import { HeaderRow } from './HeaderRow'
import { ListProvider, useListContext } from './ListContext'
import { Row } from './Row'
import { SelectBar } from './SelectBar'
import { SkeletonRows } from './SkeletonRows'
import { EXPANDABLE_COLUMN_SIZE, SELECTABLE_CHECKBOX_SIZE } from './constants'

const StyledList = styled('table', {
  shouldForwardProp: prop => !['template'].includes(prop),
})<{ template: string }>`
  width: 100%;
  box-sizing: content-box;
  gap: ${({ theme }) => theme.space['1']};
  border-collapse: separate;
  border-spacing: 0 ${({ theme }) => theme.space['2']};
  position: relative;

  tr {
      position: relative;

      &:before {
          content: "";
          position: absolute;
          top: 0; /* Adjust based on border width and spacing */
          left: 0;
          right: 0;
          bottom: 0; /* Adjust based on border width and spacing */
          border: 1px solid ${({ theme }) => theme.colors.neutral.border};
          border-radius: ${({ theme }) => theme.radii.default};
          pointer-events: none;
          transition:
            box-shadow 200ms ease,
            border-color 200ms ease;
      }

      &:hover::before {
        border: 1px solid ${({ theme }) => theme.colors.primary.border};
      }
  }
`

type ColumnProps = Pick<
  ComponentProps<typeof HeaderCell>,
  'isOrdered' | 'onOrder' | 'orderDirection'
> & {
  label?: string
  width?: string
  info?: string
}

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
}

const BaseList = forwardRef(
  (
    {
      expandable = false,
      selectable = false,
      columns,
      children,
      loading,
      autoCollapse = false,
      onSelectedChange,
    }: ListProps,
    ref: ForwardedRef<HTMLTableElement>,
  ) => {
    const computeTemplate = `${
      selectable ? `${SELECTABLE_CHECKBOX_SIZE}px ` : ''
    }${expandable ? `${EXPANDABLE_COLUMN_SIZE}px ` : ''}${columns
      .map(({ width }) => width ?? 'minmax(0, 1fr)')
      .join(' ')}`

    return (
      <ListProvider
        selectable={selectable}
        expandButton={expandable}
        autoCollapse={autoCollapse}
        onSelectedChange={onSelectedChange}
      >
        <StyledList ref={ref} template={computeTemplate}>
          <HeaderRow hasSelectAllColumn={selectable}>
            {columns.map((column, index) => (
              <HeaderCell
                key={`header-column-${index}`}
                isOrdered={column.isOrdered}
                orderDirection={column.orderDirection}
                onOrder={column.onOrder}
                info={column.info}
              >
                {column.label}
              </HeaderCell>
            ))}
          </HeaderRow>
          {loading ? (
            <SkeletonRows
              selectable={selectable}
              rows={5}
              cols={columns.length}
            />
          ) : (
            children
          )}
        </StyledList>
      </ListProvider>
    )
  },
)

/**
 * List is a component that displays a list of items based on the columns you provide and the data you pass.
 */
export const List = Object.assign(BaseList, {
  Row,
  Cell,
  SelectBar,
  useListContext,
})
