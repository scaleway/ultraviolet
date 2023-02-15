import styled from '@emotion/styled'
import type { ReactNode } from 'react'

const StyledBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['2']};
`

type BodyProps = {
  children: ReactNode
}

export const Body = ({ children }: BodyProps) => (
  <StyledBody role="rowgroup">{children}</StyledBody>
)
