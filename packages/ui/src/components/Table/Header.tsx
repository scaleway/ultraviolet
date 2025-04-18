'use client'

import styled from '@emotion/styled'
import type { ReactNode } from 'react'

const StyledHeader = styled('thead')`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
`

type HeaderProps = {
  children: ReactNode
}

export const Header = ({ children }: HeaderProps) => (
  <StyledHeader>{children}</StyledHeader>
)
