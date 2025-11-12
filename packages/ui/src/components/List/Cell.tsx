'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties, ReactNode } from 'react'
import { forwardRef } from 'react'
import { useColumnProvider } from './ColumnProvider'
import { listCell } from './styles.css'
import { maxWidthCell, minWidthCell, widthCell } from './variables.css'

type CellProps = {
  children?: ReactNode
  className?: string
  'data-testid'?: string
  colSpan?: number
  style?: CSSProperties
}

export const Cell = forwardRef<HTMLTableCellElement, CellProps>(
  ({ children, className, 'data-testid': dataTestid, colSpan, style }, ref) => {
    const { maxWidth, minWidth, width } = useColumnProvider()

    return (
      <td
        className={`${className ? `${className} ` : ''}${listCell}`}
        colSpan={colSpan}
        data-testid={dataTestid}
        ref={ref}
        style={{
          ...assignInlineVars({
            [widthCell]: width,
            [minWidthCell]: minWidth,
            [maxWidthCell]: maxWidth,
          }),
          ...style,
        }}
      >
        {children}
      </td>
    )
  },
)
