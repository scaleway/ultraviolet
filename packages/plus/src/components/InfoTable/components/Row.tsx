'use client'

import { Row } from '@ultraviolet/ui'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties, ReactNode } from 'react'
import { useContext } from 'react'
import { InfoTableContext } from '../context'
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
        ...style,
        ...assignInlineVars({
          [rowWidth]: width ?? '100%',
        }),
      }}
      templateColumns={templateColumns}
    >
      {children}
    </Row>
  )
}
