import styled from '@emotion/styled'
import { ReactNode } from 'react'

const StyledTbody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['2']};
`

type ListBodyProps = {
  children: ReactNode
  className?: string
}

export const ListBody = ({ children, className }: ListBodyProps) => (
  <StyledTbody role="rowgroup" className={className}>
    {children}
  </StyledTbody>
)
