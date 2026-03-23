'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { useContext } from 'react'

import { Row } from '../../../Row'
import { InfoTableContext } from '../Context'
import { infoTableStyle, rowWidth } from '../styles.css'

import type { CSSProperties, ReactNode } from 'react'

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
      className={infoTableStyle.row}
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
