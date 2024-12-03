import styled from '@emotion/styled'
import {
  InformationIcon,
  SortIcon as SortIconUV,
  SouthShortIcon,
} from '@ultraviolet/icons'
import type { ReactNode } from 'react'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

const StyledSortIcon = styled(SouthShortIcon, {
  shouldForwardProp: prop => !['order'].includes(prop),
})<{ order: 'ascending' | 'descending' }>`
    transform: ${({ order }) => (order === 'ascending' ? 'rotate(-180deg)' : 'none')};
    transition: transform 0.2s;
`

const SortIcon = ({ order }: { order?: 'ascending' | 'descending' }) =>
  order ? (
    <StyledSortIcon order={order} sentiment="primary" />
  ) : (
    <SortIconUV sentiment="neutral" />
  )

type StyledHeaderCellProps = Pick<
  HeaderCellProps,
  'width' | 'maxWidth' | 'minWidth'
> & {
  align?: 'left' | 'center' | 'right'
}

const StyledHeaderCell = styled('th', {
  shouldForwardProp: prop =>
    !['align', 'width', 'maxWidth', 'minWidth'].includes(prop),
})<StyledHeaderCellProps>`
${({ width, maxWidth, minWidth }) => `
    ${width ? `width: ${width};` : ''}
    ${maxWidth ? `max-width: ${maxWidth};` : ''}
    ${minWidth ? `min-width: ${minWidth};` : ''}
  `}
  display: table-cell;
  vertical-align: middle;
  text-align: ${({ align }) => align};
  padding: ${({ theme }) => theme.space['1']};

  &[role*='button'] {
    cursor: pointer;
    user-select: none;
  }
`

const StyledText = styled(Text)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space['1']};
`

type HeaderCellProps = {
  children: ReactNode
  className?: string
  isOrdered?: boolean
  orderDirection?: 'asc' | 'desc' | 'none'
  onOrder?: (newOrder: 'asc' | 'desc') => void
  info?: string
  align?: 'left' | 'center' | 'right'
  width?: string
  maxWidth?: string
  minWidth?: string
}

export const HeaderCell = ({
  children,
  className,
  isOrdered,
  onOrder,
  orderDirection,
  info,
  align,
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
      aria-sort={order}
      align={align}
      width={width}
      maxWidth={maxWidth}
      minWidth={minWidth}
    >
      <StyledText
        as="div"
        variant="bodySmall"
        color={order !== undefined ? 'primary' : 'neutral'}
      >
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
          <SortIcon aria-disabled={!onOrder} order={order} />
        ) : null}
      </StyledText>
    </StyledHeaderCell>
  )
}
