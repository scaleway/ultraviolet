'use client'

import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Context } from './Context'
import { InfoTableCell } from './components/Cell'
import { InfoTableRow, StyledRow } from './components/Row'

const StyledDl = styled('dl', {
  shouldForwardProp: prop => !['width'].includes(prop),
})<{ width?: string }>`
  display: flex;
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  flex-direction: column;
  align-items: start;
  margin: 0;
  width: 100%;

  ${StyledRow} {
    width: ${({ width }) => width ?? '100%'};
  }
`

type InfoTableProps = {
  children: ReactNode
  multiLine?: boolean
  width?: string
}

/**
 * Use this component to display offers.
 * Create rows with `InfoTable.Row` and place cells within each row using `InfoTable.Cell`.
 */
export const InfoTable = ({
  children,
  multiLine = false,
  width,
}: InfoTableProps) => (
  <Context.Provider value={{ ellipsis: !multiLine }}>
    <StyledDl data-ellipsis={!multiLine} width={width}>
      {children}
    </StyledDl>
  </Context.Provider>
)

InfoTable.Row = InfoTableRow
InfoTable.Cell = InfoTableCell
