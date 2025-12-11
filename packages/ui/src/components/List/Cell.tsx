'use client'

import { cn } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties, ReactNode } from 'react'
import { forwardRef } from 'react'
import { useColumnProvider } from './ColumnProvider'
import { listCell } from './styles.css'
import {
  listCellPadding,
  maxWidthCell,
  maxWidthChildrenCell,
  minWidthCell,
  minWidthChildrenCell,
  widthCell,
  widthChildrenCell,
} from './variables.css'

type CellProps = {
  children?: ReactNode
  className?: string
  'data-testid'?: string
  colSpan?: number
  style?: CSSProperties
}

export const Cell = forwardRef<HTMLTableCellElement, CellProps>(
  ({ children, className, 'data-testid': dataTestid, colSpan, style }, ref) => {
    const context = useColumnProvider()

    const width = context?.width
    const maxWidth = context?.width
    const minWidth = context?.width

    /** Remove padding from width to avoid overflow since boxSizing = 'content-box' */
    const widthChildren = width?.includes('%')
      ? '100%'
      : `calc(${widthCell} - ${listCellPadding} - ${listCellPadding})`
    const maxWidthChildren = maxWidth?.includes('%')
      ? '100%'
      : `calc(${maxWidth} - ${listCellPadding} - ${listCellPadding})`
    const minWidthChildren = minWidth?.includes('%')
      ? '100%'
      : `calc(${minWidth} - ${listCellPadding} - ${listCellPadding})`

    return (
      <td
        className={cn(className, listCell)}
        colSpan={colSpan}
        data-testid={dataTestid}
        ref={ref}
        style={{
          ...assignInlineVars({
            [widthCell]: width ?? 'auto',
            [minWidthCell]: minWidth ?? 'auto',
            [maxWidthCell]: maxWidth ?? 'none',
            [widthChildrenCell]: width ? widthChildren : 'auto',
            [maxWidthChildrenCell]: maxWidth ? maxWidthChildren : 'none',
            [minWidthChildrenCell]: minWidth ? minWidthChildren : 'auto',
          }),
          ...style,
        }}
      >
        {children}
      </td>
    )
  },
)
