'use client'

import { cn } from '@ultraviolet/utils'
import { useMemo } from 'react'

import { InfoTableCell } from './components/Cell'
import { CellWithCopyButton } from './components/CellWithCopyButton'
import { InfoTableRow } from './components/Row'
import { InfoTableContext } from './Context'
import { infoTableStyle } from './styles.css'

import type { CSSProperties, ReactNode } from 'react'

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
const BaseInfoTable = ({
  children,
  width,
  className,
  style,
  'data-testid': dataTestId,
}: InfoTableProps) => {
  const value = useMemo(() => ({ width }), [width])

  return (
    <InfoTableContext.Provider value={value}>
      <dl
        className={cn(className, infoTableStyle.dl)}
        data-testid={dataTestId}
        style={style}
      >
        {children}
      </dl>
    </InfoTableContext.Provider>
  )
}

export const InfoTable = Object.assign(BaseInfoTable, {
  Row: InfoTableRow,
  Cell: InfoTableCell,
  CellWithCopyButton,
})
