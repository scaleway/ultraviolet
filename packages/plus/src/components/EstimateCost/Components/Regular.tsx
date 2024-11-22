import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { type ReactNode, memo } from 'react'
import { useOverlay } from '../OverlayContext'

type RegularProps = {
  variant?: 'normal' | 'small' | 'big' | 'capitalized'
  isDisabledOnOverlay?: boolean
  children?: ReactNode
  className?: string
}

const StyledRegular = styled('div', {
  shouldForwardProp: prop => !['variant', 'isOverlay'].includes(prop),
})<{
  isOverlay: boolean
  variant: 'normal' | 'small' | 'big' | 'capitalized'
}>`
  display: ${({ isOverlay }) => (isOverlay ? 'flex' : 'inline-flex')};
  max-width: 500px;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutral.textStrong};
  margin-right: 4px;

  ${({ theme, variant }) =>
    variant === 'small' &&
    css`
      display: block;
      font-size: 14px;
      line-height: 8px;
      color: ${theme.colors.neutral.text};
    `};
`

export const Regular = memo(
  ({
    variant = 'normal',
    isDisabledOnOverlay = false,
    children = null,
    className,
  }: RegularProps) => {
    const { isOverlay } = useOverlay()

    return !isDisabledOnOverlay || !isOverlay ? (
      <StyledRegular
        className={className}
        variant={variant}
        isOverlay={isOverlay}
      >
        {children}
      </StyledRegular>
    ) : null
  },
)
