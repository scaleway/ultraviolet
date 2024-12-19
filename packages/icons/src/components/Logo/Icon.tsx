import styled from '@emotion/styled'
import type { ReactNode } from 'react'

const SIZES = {
  small: '200',
  medium: '250',
  large: '400',
  xlarge: '700',
} as const

const StyledIcon = styled('svg', {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: keyof typeof SIZES }>`
  & {
    width: ${({ size, theme }) => `${theme.sizing[SIZES[size]]}`};
    min-width: ${({ size, theme }) => `${theme.sizing[SIZES[size]]}`}; // This is to avoid the icon to shrink when the text is too long
    height: ${({ size, theme }) => `${theme.sizing[SIZES[size]]}`};
  }
`

export type IconProps = {
  size?: keyof typeof SIZES
  className?: string
  children: ReactNode
}

/**
 * Logo component is used to render a set of logos. Their style cannot be changed
 */
export const Icon = ({ size = 'small', className, children }: IconProps) => (
  <StyledIcon size={size} viewBox="0 0 20 20" className={className}>
    {children}
  </StyledIcon>
)
