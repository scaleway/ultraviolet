import styled from '@emotion/styled'
import {
  InformationIcon,
  SortIcon as SortIconUV,
  SouthShortIcon,
} from '@ultraviolet/icons'
import type { ReactNode } from 'react'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'

const StyledSortIcon = styled(SouthShortIcon, {
  shouldForwardProp: prop => !['order'].includes(prop),
})<{ order: 'ascending' | 'descending' }>`
  transform: ${({ order }) => (order === 'ascending' ? 'rotate(-180deg)' : 'none')};
  transition: transform 0.2s ease-in-out;
`

const SortIcon = ({ order }: { order?: 'ascending' | 'descending' }) =>
  order ? (
    <StyledSortIcon order={order} sentiment="primary" />
  ) : (
    <SortIconUV sentiment="neutral" />
  )

const StyledHeaderCell = styled('th', {
  shouldForwardProp: prop => !['width'].includes(prop),
})<{ width?: string }>`
  display: table-cell;
  text-align: left;
  vertical-align: middle;
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodySmall.weight};
  font-family: ${({ theme }) => theme.typography.bodySmall.fontFamily};
  color: ${({ theme }) => theme.colors.neutral.text};
  gap: ${({ theme }) => theme.space['1']};
  padding: 0 ${({ theme }) => theme.space['2']};

  &[role*='button'] {
    cursor: pointer;
    user-select: none;
  }

  &[aria-sort] {
    color: ${({ theme }) => theme.colors.primary.text};
  }

  width: ${({ width }) => width};
`

type HeaderCellProps = {
  children: ReactNode
  className?: string
  isOrdered?: boolean
  orderDirection?: 'asc' | 'desc' | 'none'
  onOrder?: (newOrder: 'asc' | 'desc') => void
  info?: string
  width?: string
}

export const HeaderCell = ({
  children,
  isOrdered,
  orderDirection,
  onOrder,
  className,
  info,
  width,
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
      width={width}
    >
      <Stack direction="row" gap={1} alignItems="center">
        {children}
        {info ? (
          <Tooltip text={info}>
            <InformationIcon
              size="large"
              prominence="weak"
              sentiment="neutral"
            />
          </Tooltip>
        ) : null}
        {orderDirection !== undefined && isOrdered !== undefined ? (
          <SortIcon order={order} />
        ) : null}
      </Stack>
    </StyledHeaderCell>
  )
}
