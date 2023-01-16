import styled from '@emotion/styled'
import type { ReactNode } from 'react'

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.neutral.text};
  font-size: ${({ theme }) => theme.typography.bodyStrong.fontSize};
  line-height: ${({ theme }) => theme.typography.bodyStrong.lineHeight};
  font-weight: ${({ theme }) => theme.typography.bodyStrong.weight};
`

type LabelProps = {
  children: ReactNode
  htmlFor?: string
}

export const Label = ({ children, htmlFor }: LabelProps) => (
  <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>
)
