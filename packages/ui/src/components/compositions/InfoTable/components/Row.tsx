'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties, ReactNode } from 'react'
import { useContext } from 'react'
import { Row } from '../../../Row'
import { InfoTableContext } from '../Context'
import { infoTableRow, rowWidth } from '../styles.css'

type RowProps = {
  children: ReactNode
  templateColumns: string
  style?: CSSProperties
}

export const InfoTableRow = ({
  children,
  templateColumns,
  style,
}: RowProps) => {
  const { width } = useContext(InfoTableContext)

  return (
    <Row
      className={infoTableRow}
      style={{
        ...assignInlineVars({
          [rowWidth]: width ?? '100%',
        }),
        ...style,
      }}
      templateColumns={templateColumns}
    >
      {children}
    </Row>
  )
}
