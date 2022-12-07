import styled from '@emotion/styled'
import { ReactNode } from 'react'

const StyledThead = styled.div`
  display: block;
`

type ListHeadersProps = {
  children: ReactNode
  className?: string
}

export const ListHeaders = ({ children, className }: ListHeadersProps) => (
  <StyledThead role="rowgroup" className={className}>
    {children}
  </StyledThead>
)
