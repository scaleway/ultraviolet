'use client'

import styled from '@emotion/styled'
import type { ReactNode } from 'react'
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
  <StyledDl className={className} data-testid={dataTestId} width={width}>
    {children}
  </StyledDl>
)

InfoTable.Row = InfoTableRow
InfoTable.Cell = InfoTableCell
