'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { useContext } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Row } from '../../../components/Row'
import { InfoTableContext } from '../Context'
import { infoTableStyle, rowWidth } from '../styles.css'

type RowProps = {
  children: ReactNode
  templateColumns: string
  style?: CSSProperties
}

export const InfoTableRow = ({ children, templateColumns, style }: RowProps) => {
  const { width, size } = useContext(InfoTableContext)

  return (
    <Row
      className={infoTableStyle.row({ size })}
      style={{
        ...assignInlineVars({
          [rowWidth]: width ?? '100%',
        }),
        ...style,
      }}
      templateColumns={templateColumns}
      gap={2}
    >
      {children}
    </Row>
  )
}
InfoTableRow.displayName = 'Infotable.Row'
