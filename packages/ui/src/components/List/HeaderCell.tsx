'use client'

import {
  InformationOutlineIcon,
  SortIcon as SortIconUV,
  SouthShortIcon,
} from '@ultraviolet/icons'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ReactNode } from 'react'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'
import { listHeaderCell, listSortIcon } from './styles.css'
import {
  maxWidthHeaderCell,
  minWidthHeaderCell,
  widthHeaderCell,
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
  width?: string
  minWidth?: string
  maxWidth?: string
}

export const HeaderCell = ({
  children,
  isOrdered,
  orderDirection,
  onOrder,
  className,
  info,
  width,
  minWidth,
  maxWidth,
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
      aria-sort={order}
      className={`${className ? `${className} ` : ''}${listHeaderCell}`}
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
        [widthHeaderCell]: width,
        [minWidthHeaderCell]: minWidth,
        [maxWidthHeaderCell]: maxWidth,
      })}
      tabIndex={handleOrder ? 0 : -1}
    >
      <Stack alignItems="center" direction="row" gap={1}>
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
          <SortIcon order={order} />
        ) : null}
      </Stack>
    </th>
  )
}
