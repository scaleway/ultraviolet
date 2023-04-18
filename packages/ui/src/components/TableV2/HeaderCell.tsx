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

  &[role*='button'] {
    cursor: pointer;
    user-select: none;
  }

  &[aria-sort] {
    color: ${({ theme }) => theme.colors.primary.iconWeak};
  }

  &[aria-sort='ascending'] ${ArrowUpIcon} {
    color: ${({ theme }) => theme.colors.primary.iconWeak};
  }

  &[aria-sort='descending'] ${ArrowDownIcon} {
    color: ${({ theme }) => theme.colors.primary.iconWeak};
  }
`

const SortIcon = () => (
  <StyledIconContainer>
    <ArrowUpIcon name="arrow-up" size={10} />
    <ArrowDownIcon name="arrow-down" size={10} />
  </StyledIconContainer>
)

type StyledHeaderCellProps = Pick<
  HeaderCellProps,
  'width' | 'maxWidth' | 'minWidth'
>
const StyledHeaderCell = styled('th', {
  shouldForwardProp: prop => !['width', 'maxWidth', 'minWidth'].includes(prop),
})<StyledHeaderCellProps>`
  ${({ width, maxWidth, minWidth }) => `
    ${width ? `width: ${width};` : ''}
    ${maxWidth ? `max-width: ${maxWidth};` : ''}
    ${minWidth ? `min-width: ${minWidth};` : ''}
  `}

  padding: ${({ theme }) => theme.space['1']};
`

const HeaderCellContent = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space['1']};

  text-align: left;
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodySmall.weight};
  font-family: ${({ theme }) => theme.typography.bodySmall.fontFamily};
  color: ${({ theme }) => theme.colors.neutral.textWeak};
`

type HeaderCellProps = {
  children: ReactNode
  className?: string
  isOrdered?: boolean
  orderDirection?: 'asc' | 'desc' | 'none'
  onOrder?: (newOrder: 'asc' | 'desc') => void
  width?: string
  minWidth?: string
  maxWidth?: string
}

export const HeaderCell = ({
  children,
  className,
  isOrdered,
  onOrder,
  orderDirection,
  width,
  maxWidth,
  minWidth,
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
              if (event.key === ' ') {
                handleOrder()
                event.preventDefault()
              }
            }
          : undefined
      }
      role={onOrder ? 'button columnheader' : undefined}
      width={width}
      maxWidth={maxWidth}
      minWidth={minWidth}
      tabIndex={handleOrder ? 0 : -1}
    >
      <HeaderCellContent>
        {children}
        {orderDirection !== undefined && isOrdered !== undefined ? (
          <SortIcon
            data-sorted={order !== undefined}
            aria-disabled={!onOrder}
          />
        ) : null}
      </HeaderCellContent>
    </StyledHeaderCell>
  )
}
