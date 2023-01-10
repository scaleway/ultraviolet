import styled from '@emotion/styled'
import type { HTMLProps, MouseEvent, ReactNode } from 'react'
import { Icon } from '../Icon'
import { Stack } from '../Stack'

type ListOrder = 'asc' | 'desc' | 'none'

const getAriaSort = (
  sort: ListOrder,
): HTMLProps<HTMLDivElement>['aria-sort'] => {
  if (sort === 'asc') return 'ascending'

  if (sort === 'desc') return 'descending'

  return sort === 'none' ? 'none' : 'other'
}

const ArrowDownIcon = styled(Icon)``
const ArrowUpIcon = styled(Icon)``

const StyledIconContainer = styled(Stack)`
  color: ${({ theme }) => theme.colors.neutral.textWeak};
`

const StyledHeader = styled('div', {
  shouldForwardProp: prop => !['sortable', 'colSpan'].includes(prop),
})<{
  colSpan?: number
  'data-sorted'?: boolean
  sortable?: boolean
}>`
  display: flex;
  text-align: left;
  flex-direction: row;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodySmall.weight};
  font-family: ${({ theme }) => theme.typography.bodySmall.fontFamily};
  color: ${({ theme }) => theme.colors.neutral.textWeak};
  gap: ${({ theme }) => theme.space['1']};
  ${({ colSpan }) => (colSpan ? `grid-column: span ${colSpan} / span 12;` : '')}
  ${({ sortable }) => (sortable ? `cursor: pointer; user-select: none;` : '')}

  &[data-sorted="true"] {
    color: ${({ theme }) => theme.colors.primary.textWeak};
  }

  &[aria-sort='ascending'] ${ArrowUpIcon} {
    color: ${({ theme }) => theme.colors.primary.textWeak};
  }

  &[aria-sort='descending'] ${ArrowDownIcon} {
    color: ${({ theme }) => theme.colors.primary.textWeak};
  }
`

const SortIcon = () => (
  <StyledIconContainer>
    <ArrowUpIcon name="arrow-up" size={10} />
    <ArrowDownIcon name="arrow-down" size={10} />
  </StyledIconContainer>
)

type ListHeaderCellProps = {
  children?: ReactNode
  colSpan?: number
  className?: string
  sort?: ListOrder
  onClick?: (
    currentSort: { columnId: string; newOrder: ListOrder },
    event: MouseEvent<HTMLDivElement>,
  ) => unknown | void
  id?: string
}

export const ListHeaderCell = ({
  children,
  colSpan,
  className,
  onClick,
  sort,
  id,
}: ListHeaderCellProps) => (
  <StyledHeader
    onClick={
      id
        ? event =>
            onClick?.(
              { columnId: id, newOrder: sort === 'asc' ? 'desc' : 'asc' },
              event,
            )
        : undefined
    }
    role="columnheader"
    aria-sort={sort ? getAriaSort(sort) : undefined}
    colSpan={colSpan}
    className={className}
    data-sorted={sort === 'asc' || sort === 'desc'}
    sortable={!!sort}
  >
    {children}
    {sort ? <SortIcon /> : null}
  </StyledHeader>
)
