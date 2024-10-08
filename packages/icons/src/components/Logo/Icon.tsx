import styled from '@emotion/styled'
import type { ReactNode } from 'react'

const SIZES = {
  small: 16,
  medium: 20,
  large: 32,
  xlarge: 56,
}

const StyledIcon = styled('svg', {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: keyof typeof SIZES }>`
  & {
    width: ${({ size }) => `${SIZES[size]}px`};
    min-width: ${({ size }) => `${SIZES[size]}px`}; // This is to avoid the icon to shrink when the text is too long
    height: ${({ size }) => `${SIZES[size]}px`};
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
