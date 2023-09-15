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
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  gap: ${({ theme }) => theme.space['1']};

  [role='row'],
  [role='button row'] {
    display: grid;
    width: 100%;
    grid-template-columns: ${({ template }) => template};
    align-items: center;
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
}

const BaseList = forwardRef(
  (
    {
      selectable = false,
      columns,
      children,
      loading,
      autoCollapse = false,
    }: ListProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const computeTemplate = `${
      selectable ? `${SELECTABLE_CHECKBOX_SIZE}px ` : ''
    }${columns.map(({ width }) => width ?? 'minmax(0, 1fr)').join(' ')}`

    return (
      <ListProvider selectable={selectable} autoCollapse={autoCollapse}>
        <StyledList ref={ref} role="grid" template={computeTemplate}>
          <HeaderRow hasSelectAllColumn={selectable}>
            {columns.map((column, index) => (
              <HeaderCell
                // eslint-disable-next-line react/no-array-index-key
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
          <Body>
            {loading ? (
              <SkeletonRows
                selectable={selectable}
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

/**
 * List is a component that displays a list of items based on the columns you provide and the data you pass.
 */
export const List = Object.assign(BaseList, {
  Row,
  Cell,
  SelectBar,
  useListContext,
})
