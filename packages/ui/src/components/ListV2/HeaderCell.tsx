import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Icon } from '../Icon'
import { Stack } from '../Stack'

const ArrowDownIcon = styled(Icon)``
const ArrowUpIcon = styled(Icon)``

const StyledIconContainer = styled(Stack)`
  color: ${({ theme }) => theme.colors.neutral.textWeak};

  &[aria-disabled='true'] {
    cursor: not-allowed;
  }
`

const SortIcon = () => (
  <StyledIconContainer>
    <ArrowUpIcon name="arrow-up" size={10} />
    <ArrowDownIcon name="arrow-down" size={10} />
  </StyledIconContainer>
)

const StyledHeaderCell = styled.div`
  display: flex;
  text-align: left;
  flex-direction: row;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodySmall.weight};
  font-family: ${({ theme }) => theme.typography.bodySmall.fontFamily};
  color: ${({ theme }) => theme.colors.neutral.textWeak};
  gap: ${({ theme }) => theme.space['1']};

  &[aria-sort] {
    cursor: pointer;
    user-select: none;
  }

  &[data-sorted='true'] {
    color: ${({ theme }) => theme.colors.primary.textWeak};
  }

  &[aria-sort='ascending'] ${ArrowUpIcon} {
    color: ${({ theme }) => theme.colors.primary.textWeak};
  }

  &[aria-sort='descending'] ${ArrowDownIcon} {
    color: ${({ theme }) => theme.colors.primary.textWeak};
  }
`

type HeaderCellProps = {
  children: ReactNode
  className?: string
  isOrdered?: boolean
  orderDirection?: 'asc' | 'desc' | 'none'
  onOrder?: (newOrder: 'asc' | 'desc') => void
}

export const HeaderCell = ({
  children,
  isOrdered,
  orderDirection,
  onOrder,
  className,
}: HeaderCellProps) => {
  let order: undefined | 'ascending' | 'descending'
  if (isOrdered && orderDirection === 'asc') {
    order = 'ascending'
  } else if (isOrdered && orderDirection === 'desc') {
    order = 'descending'
  }

  return (
    <StyledHeaderCell
      role="columnheader"
      aria-sort={order}
      onClick={
        onOrder
          ? () => onOrder(order === 'ascending' ? 'desc' : 'asc')
          : undefined
      }
      className={className}
    >
      {children}
      {orderDirection !== undefined && isOrdered !== undefined ? (
        <SortIcon data-sorted={order !== undefined} aria-disabled={!onOrder} />
      ) : null}
    </StyledHeaderCell>
  )
}
