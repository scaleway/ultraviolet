'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties, ReactNode } from 'react'
import type { Color } from '../../theme'
import { useColumnProvider } from '../List/ColumnProvider'
import { tableCell } from './styles.css'
import { maxWidthCell, minWidthCell, widthCell } from './variables.css'

type Align = 'left' | 'center' | 'right'

type CellProps = {
  children?: ReactNode
  className?: string
  colSpan?: number
  rowSpan?: number
  sentiment?: Color
  align?: Align
  style?: CSSProperties
}

export const Cell = ({
  children,
  className,
  colSpan,
  rowSpan,
  sentiment,
  align = 'left',
  style,
}: CellProps) => {
  const { maxWidth, minWidth, width } = useColumnProvider()

  return (
    <td
      align={align}
      className={`${className ? `${className} ` : ''}${tableCell({ align, sentiment })}`}
      colSpan={colSpan}
      rowSpan={rowSpan}
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
}
