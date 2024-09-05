import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons/legacy'
import type { ReactNode } from 'react'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'

const ArrowDownIcon = styled(Icon)``
const ArrowUpIcon = styled(Icon)``

const StyledIconContainer = styled(Stack)`
  color: ${({ theme }) => theme.colors.neutral.text};

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
  color: ${({ theme }) => theme.colors.neutral.text};
  gap: ${({ theme }) => theme.space['1']};

  &[role*='button'] {
    cursor: pointer;
    user-select: none;
  }

  &[aria-sort] {
    color: ${({ theme }) => theme.colors.primary.text};
  }

  &[aria-sort='ascending'] ${ArrowUpIcon} {
    color: ${({ theme }) => theme.colors.primary.text};
  }

  &[aria-sort='descending'] ${ArrowDownIcon} {
    color: ${({ theme }) => theme.colors.primary.text};
  }
`

type HeaderCellProps = {
  children: ReactNode
  className?: string
  isOrdered?: boolean
  orderDirection?: 'asc' | 'desc' | 'none'
  onOrder?: (newOrder: 'asc' | 'desc') => void
  info?: string
}

export const HeaderCell = ({
  children,
  isOrdered,
  orderDirection,
  onOrder,
  className,
  info,
}: HeaderCellProps) => {
  let order: undefined | 'ascending' | 'descending'
  if (isOrdered && orderDirection === 'asc') {
    order = 'ascending'
  } else if (isOrdered && orderDirection === 'desc') {
    order = 'descending'
  }

  const handleOrder = onOrder
    ? () => onOrder(order === 'ascending' ? 'desc' : 'asc')
    : undefined

  return (
    <StyledHeaderCell
      aria-sort={order}
      className={className}
      onClick={handleOrder}
      onKeyDown={
        handleOrder
          ? event => {
              if (event.key === ' ' || event.key === 'Enter') {
                handleOrder()
                if (event.key === ' ') {
                  // @note: it avoid scroll when pressing Space
                  event.preventDefault()
                }
              }
            }
          : undefined
      }
      role={onOrder ? 'button columnheader' : undefined}
      tabIndex={handleOrder ? 0 : -1}
    >
      {children}
      {info ? (
        <Tooltip text={info}>
          <Icon
            name="information-outline"
            size={20}
            prominence="weak"
            color="neutral"
          />
        </Tooltip>
      ) : null}
      {orderDirection !== undefined && isOrdered !== undefined ? (
        <SortIcon data-sorted={order !== undefined} />
      ) : null}
    </StyledHeaderCell>
  )
}
