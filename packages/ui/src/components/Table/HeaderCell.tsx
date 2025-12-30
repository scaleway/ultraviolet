'use client'

import {
  InformationOutlineIcon,
  SortIcon as SortIconUV,
  SouthShortIcon,
} from '@ultraviolet/icons'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ReactNode } from 'react'
import { listSortIcon } from '../List/styles.css'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import { headerCellText, tableHeaderCell } from './styles.css'
import {
  headerCellMaxWidth,
  headerCellMinWidth,
  headerCellWidth,
} from './variables.css'

const SortIcon = ({ order }: { order?: 'ascending' | 'descending' }) =>
  order ? (
    <SouthShortIcon className={listSortIcon[order]} sentiment="primary" />
  ) : (
    <SortIconUV sentiment="neutral" />
  )

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
  isCheckbox?: boolean
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
  isCheckbox,
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
    <th
      align={align}
      aria-sort={order}
      className={cn(className, tableHeaderCell({ align, checked: isCheckbox }))}
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
      style={assignInlineVars({
        [headerCellWidth]: width ?? 'auto',
        [headerCellMaxWidth]: maxWidth ?? 'none',
        [headerCellMinWidth]: minWidth ?? 'auto',
      })}
      tabIndex={handleOrder ? 0 : -1}
    >
      <Text
        as="div"
        className={headerCellText}
        sentiment={order !== undefined ? 'primary' : 'neutral'}
        variant="bodySmall"
      >
        {children}
        {info ? (
          <Tooltip text={info}>
            <InformationOutlineIcon
              prominence="weak"
              sentiment="neutral"
              size="small"
            />
          </Tooltip>
        ) : null}
        {orderDirection !== undefined && isOrdered !== undefined ? (
          <SortIcon aria-disabled={!onOrder} order={order} />
        ) : null}
      </Text>
    </th>
  )
}
