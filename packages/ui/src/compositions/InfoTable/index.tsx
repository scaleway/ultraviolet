'use client'

import { cn } from '@ultraviolet/utils'
import { useMemo } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Card, Text } from '../../components'
import { InfoTableCell } from './components/Cell'
import { CellWithCopyButton } from './components/CellWithCopyButton'
import { InfoTableRow } from './components/Row'
import { InfoTableContext } from './Context'
import { infoTableStyle } from './styles.css'

type InfoTableProps = {
  children: ReactNode
  width?: string
  size?: 'small' | 'large'
  className?: string
  'data-testid'?: string
  header?: ReactNode
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
  header,
  size = 'large',
}: InfoTableProps) => {
  const value = useMemo(() => ({ width, size }), [width, size])

  return (
    <InfoTableContext.Provider value={value}>
      {header ? (
        <Card
          className={infoTableStyle.card[size]}
          header={
            typeof header === 'string' ? (
              <Text
                as="h2"
                prominence="strong"
                sentiment="neutral"
                variant={size === 'small' ? 'headingSmall' : 'heading'}
              >
                {header}
              </Text>
            ) : (
              header
            )
          }
        >
          <dl className={cn(className, infoTableStyle.dl)} data-testid={dataTestId} style={style}>
            {children}
          </dl>
        </Card>
      ) : (
        <dl className={cn(className, infoTableStyle.dl)} data-testid={dataTestId} style={style}>
          {children}
        </dl>
      )}
    </InfoTableContext.Provider>
  )
}

export const InfoTable = Object.assign(BaseInfoTable, {
  Row: InfoTableRow,
  Cell: InfoTableCell,
  CellWithCopyButton,
})
