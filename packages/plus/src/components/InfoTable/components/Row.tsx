'use client'

import { Row } from '@ultraviolet/ui'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ReactNode } from 'react'
import { useContext } from 'react'
import { InfoTableContext } from '../context'
import { infoTableRow, rowWidth } from '../styles.css'

type RowProps = {
  children: ReactNode
  templateColumns: string
}

export const InfoTableRow = ({ children, templateColumns }: RowProps) => {
  const { width } = useContext(InfoTableContext)

  return (
    <Row
      className={infoTableRow}
      style={assignInlineVars({
        [rowWidth]: width ?? '100%',
      })}
      templateColumns={templateColumns}
    >
      {children}
    </Row>
  )
}
