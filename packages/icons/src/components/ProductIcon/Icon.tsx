import styled from '@emotion/styled'
import type { ReactNode } from 'react'

type Variants = 'primary' | 'danger' | 'warning' | 'original'

export const SIZES = {
  xsmall: '300',
  small: '400',
  medium: '500',
  large: '600',
  xlarge: '800',
} as const

const StyledIcon = styled('svg', {
  shouldForwardProp: prop => !['variant', 'disabled'].includes(prop),
})<{ variant: Variants; disabled?: boolean; size: keyof typeof SIZES }>`
  & {
    width: ${({ size, theme }) => `${theme.sizing[SIZES[size]]}`};
    min-width: ${({ size, theme }) => `${theme.sizing[SIZES[size]]}`}; // This is to avoid the icon to shrink when the text is too long
    height: ${({ size, theme }) => `${theme.sizing[SIZES[size]]}`};
  }

  path[fill].fill,
  g[fill].fill > *,
  g.fill > * {
    fill: ${({ theme, variant, disabled }) =>
      `${
        theme.colors.other.icon.product[variant][
          disabled ? 'fillDisabled' : 'fill'
        ]
      }`};
  }

  path[fill].fillStrong,
  g[fill].fillStrong > *,
  g.fillStrong > * {
    fill: ${({ theme, variant, disabled }) =>
      `${
        theme.colors.other.icon.product[variant][
          disabled ? 'fillStrongDisabled' : 'fillStrong'
        ]
      }`};
  }

  path[fill].fillWeak,
  g[fill].fillWeak > *,
  g.fillWeak > * {
    fill: ${({ theme, variant, disabled }) =>
      `${
        theme.colors.other.icon.product[variant][
          disabled ? 'fillWeakDisabled' : 'fillWeak'
        ]
      }`};
  }
`

export type IconProps = {
  variant?: Variants
  disabled?: boolean
  size?: keyof typeof SIZES
  className?: string
  children: ReactNode
}

/**
 * ProductIcon component is used to render a set of icons that are linked to a product or service.
 * Those icons are made of multiple colors that changes automatically based on the current theme.
 */
export const Icon = ({
  variant = 'primary',
  disabled,
  size = 'small',
  className,
  children,
}: IconProps) => (
  <StyledIcon
    variant={variant}
    disabled={disabled}
    size={size}
    viewBox="0 0 64 64"
    className={className}
  >
    {children}
  </StyledIcon>
)
