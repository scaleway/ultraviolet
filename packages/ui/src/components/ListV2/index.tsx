import styled from '@emotion/styled'
import type { ComponentProps, ForwardedRef, ReactNode } from 'react'
import { forwardRef } from 'react'
import { Body } from './Body'
import { Cell } from './Cell'
import { HeaderCell } from './HeaderCell'
import { HeaderRow } from './HeaderRow'
import { ListProvider, useListContext } from './ListContext'
import { Row } from './Row'
import { SelectBar } from './SelectBar'
import { SkeletonRows } from './SkeletonRows'
import { SELECTABLE_CHECKBOX_SIZE } from './constants'

const StyledList = styled('div', {
  shouldForwardProp: prop => !['template'].includes(prop),
})<{ template: string }>`
  display: grid;
  width: 100%;
  gap: ${({ theme }) => theme.space['1']};

  [role='row'],
  [role='button row'] {
    display: grid;
    grid-template-columns: ${({ template }) => template};
    overflow: auto;
  }
`

type ColumnProps = Pick<
  ComponentProps<typeof HeaderCell>,
  'isOrdered' | 'onOrder' | 'orderDirection'
> & {
  label?: string
  width?: string
}

type ListProps = {
  areRowSelectable?: boolean
  columns: ColumnProps[]
  children: ReactNode
  /**
   * Set it to true if you want to display a placeholder during loading
   * */
  isLoading?: boolean
  /**
   * Auto collapse is collapsing expandable row when another is expanding
   * */
  autoCollapse?: boolean
}

const BaseList = forwardRef(
  (
    {
      areRowSelectable = false,
      columns,
      children,
      isLoading,
      autoCollapse = false,
    }: ListProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const computeTemplate = `${
      areRowSelectable ? `${SELECTABLE_CHECKBOX_SIZE}px ` : ''
    }${columns.map(({ width }) => width ?? 'minmax(0, 1fr)').join(' ')}`

    return (
      <ListProvider
        areRowSelectable={areRowSelectable}
        autoCollapse={autoCollapse}
      >
        <StyledList ref={ref} role="grid" template={computeTemplate}>
          <HeaderRow hasSelectAllColumn={areRowSelectable}>
            {columns.map((column, index) => (
              <HeaderCell
                // eslint-disable-next-line react/no-array-index-key
                key={`header-column-${index}`}
                isOrdered={column.isOrdered}
                orderDirection={column.orderDirection}
                onOrder={column.onOrder}
              >
                {column.label}
              </HeaderCell>
            ))}
          </HeaderRow>
          <Body>
            {isLoading ? (
              <SkeletonRows
                areRowSelectable={areRowSelectable}
                rows={5}
                cols={columns.length}
              />
            ) : (
              children
            )}
          </Body>
        </StyledList>
      </ListProvider>
    )
  },
)

export const List = Object.assign(BaseList, {
  Row,
  Cell,
  SelectBar,
  useListContext,
})
