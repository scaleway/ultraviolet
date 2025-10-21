'use client'

import type { ReactNode } from 'react'
import { InfoTableCell } from './components/Cell'
import { InfoTableRow } from './components/Row'
import { InfoTableContext } from './context'
import { dl } from './styles.css'

type InfoTableProps = {
  children: ReactNode
  width?: string
  className?: string
  'data-testid'?: string
}

/**
 * Use this component to display offers.
 * Create rows with `InfoTable.Row` and place cells within each row using `InfoTable.Cell`.
 */
export const InfoTable = ({
  children,
  width,
  className,
  'data-testid': dataTestId,
}: InfoTableProps) => (
  <InfoTableContext.Provider value={{ width }}>
    <dl
      className={`${className ? `${className} ` : ''}${dl}`}
      data-testid={dataTestId}
    >
      {children}
    </dl>
  </InfoTableContext.Provider>
)

InfoTable.Row = InfoTableRow
InfoTable.Cell = InfoTableCell
