'use client'

import { cn } from '@ultraviolet/utils'
import type { CSSProperties, ReactNode } from 'react'
import { InfoTableCell } from './components/Cell'
import { InfoTableRow } from './components/Row'
import { InfoTableContext } from './context'
import { dl } from './styles.css'

type InfoTableProps = {
  children: ReactNode
  width?: string
  className?: string
  'data-testid'?: string
  style?: CSSProperties
}

/**
 * Use this component to display offers.
 * Create rows with `InfoTable.Row` and place cells within each row using `InfoTable.Cell`.
 */
export const InfoTable = ({
  children,
  width,
  className,
  style,
  'data-testid': dataTestId,
}: InfoTableProps) => (
  <InfoTableContext.Provider value={{ width }}>
    <dl className={cn(className, dl)} data-testid={dataTestId} style={style}>
      {children}
    </dl>
  </InfoTableContext.Provider>
)

InfoTable.Row = InfoTableRow
InfoTable.Cell = InfoTableCell
