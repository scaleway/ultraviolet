import styled from '@emotion/styled'
import type { ReactNode } from 'react'

const StyledCell = styled('td')`
  padding: ${({ theme }) => theme.space['1']};
  font-size: 14px;
`

type CellProps = {
  children?: ReactNode
  className?: string
  colSpan?: number
  rowSpan?: number
}

export const Cell = ({ children, className, colSpan, rowSpan }: CellProps) => (
  <StyledCell
    className={className}
    data-ultraviolet
    colSpan={colSpan}
    rowSpan={rowSpan}
  >
    {children}
  </StyledCell>
)
