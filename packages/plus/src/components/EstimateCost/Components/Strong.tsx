'use client'

import styled from '@emotion/styled'
import { type ReactNode, memo } from 'react'
import { Regular } from './Regular'

type StrongProps = {
  variant?: 'normal' | 'small' | 'big' | 'capitalized'
  children?: ReactNode
  isDisabledOnOverlay?: boolean
}

export const StyledStrong = styled(Regular, {
  shouldForwardProp: prop => !['variant'].includes(prop),
})<StrongProps>`
  display: inline-flex;
  align-items: center;
  font-size: ${({ variant }) => (variant === 'big' ? 24 : 16)}px;
  ${({ variant }) =>
    variant === 'capitalized' ? `text-transform: capitalize;` : ''}
  color: ${({ theme }) => theme.colors.neutral.textStrong};
  font-weight: 500;
  margin-right: 4px;
`

export const Strong = memo(
  ({
    variant = 'normal',
    children = null,
    isDisabledOnOverlay = false,
  }: StrongProps) => (
    <StyledStrong variant={variant} isDisabledOnOverlay={isDisabledOnOverlay}>
      {children}
    </StyledStrong>
  ),
)
