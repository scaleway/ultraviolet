import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons/legacy'
import type { ReactNode } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

const StyledIconContainer = styled(Stack)`
  color: ${({ theme }) => theme.colors.neutral.textWeak};

  &[aria-disabled='true'] {
    cursor: not-allowed;
  }

  &[role*='button'] {
    cursor: pointer;
    user-select: none;
  }
`

const SortIcon = ({ order }: { order?: 'ascending' | 'descending' }) => (
  <StyledIconContainer>
    <Icon
      name="arrow-up"
      size={10}
      color={order === 'ascending' ? 'primary' : 'neutral'}
      prominence="weak"
    />
    <Icon
      name="arrow-down"
      size={10}
      color={order === 'descending' ? 'primary' : 'neutral'}
      prominence="weak"
    />
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
  width?: string
  minWidth?: string
  maxWidth?: string
  info?: string
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
      width={width}
      maxWidth={maxWidth}
      minWidth={minWidth}
      tabIndex={handleOrder ? 0 : -1}
      aria-sort={order}
    >
      <StyledText
        as="div"
        variant="bodySmall"
        color={order !== undefined ? 'primary' : 'neutral'}
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
          <SortIcon aria-disabled={!onOrder} order={order} />
        ) : null}
      </StyledText>
    </StyledHeaderCell>
  )
}
