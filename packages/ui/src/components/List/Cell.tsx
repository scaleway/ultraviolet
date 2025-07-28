'use client'

import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

const StyledCell = styled.td`
  display: table-cell;
  vertical-align: middle;
  height: ${({ theme }) => theme.sizing['750']};
  padding: 0 ${({ theme }) => theme.space['2']};
`

type CellProps = {
  children?: ReactNode
  className?: string
  'data-testid'?: string
  colSpan?: number
}

export const Cell = forwardRef<HTMLTableCellElement, CellProps>(
  ({ children, className, 'data-testid': dataTestid, colSpan }, ref) => (
    <StyledCell
      className={className}
      colSpan={colSpan}
      data-testid={dataTestid}
      ref={ref}
    >
      {children}
    </StyledCell>
  ),
)
