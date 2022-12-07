import styled from '@emotion/styled'
import { HTMLProps, MouseEvent, ReactNode } from 'react'
import Icon from '../Icon'

const getAriaSort = (
  sort: 'asc' | 'desc' | 'none',
): HTMLProps<HTMLDivElement>['aria-sort'] => {
  if (sort === 'asc') return 'ascending'

  if (sort === 'desc') return 'descending'

  return sort === 'none' ? 'none' : 'other'
}

const ArrowDownIcon = styled(Icon)``
const ArrowUpIcon = styled(Icon)``

const StyledIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.neutral.textWeak};
`

const StyledTh = styled('div', {
  shouldForwardProp: prop => prop !== 'sortable',
})<{
  colSpan?: number
  'data-sorted'?: boolean
  sortable?: boolean
}>`
  display: flex;
  text-align: initial;
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

type ListHeaderProps = {
  children: ReactNode
  colSpan?: number
  className?: string
  sort?: 'asc' | 'desc' | 'none'
  onClick?: (
    currentSort: { column: string; order: 'asc' | 'desc' | 'none' | undefined },
    event: MouseEvent<HTMLDivElement>,
  ) => unknown | void
  id?: string
}

export const ListHeader = ({
  children,
  colSpan,
  className,
  onClick,
  sort,
  id,
}: ListHeaderProps) => (
  <StyledTh
    onClick={
      id ? event => onClick?.({ column: id, order: sort }, event) : undefined
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
  </StyledTh>
)
