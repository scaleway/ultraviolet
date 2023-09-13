import styled from '@emotion/styled'
import { PRODUCT_ICONS } from './Icons'

type Variants = 'primary' | 'danger' | 'warning'

const SIZES = {
  small: 32,
  medium: 40,
  large: 48,
  xlarge: 64,
}

type ProductIconProps = {
  name: keyof typeof PRODUCT_ICONS
  variant?: Variants
  disabled?: boolean
  size?: keyof typeof SIZES
}

const StyledIcon = styled('svg', {
  shouldForwardProp: prop => !['variant', 'disabled'].includes(prop),
})<{ variant: Variants; disabled?: boolean; size: keyof typeof SIZES }>`
  & {
    width: ${({ size }) => `${SIZES[size]}px`};
    height: ${({ size }) => `${SIZES[size]}px`};
  }

  path[fill].fill {
    fill: ${({ theme, variant, disabled }) =>
      `${
        theme.colors.other.icon.product[variant][
          disabled ? 'fillDisabled' : 'fill'
        ]
      }`};
  }

  path[fill].fillStrong {
    fill: ${({ theme, variant, disabled }) =>
      `${
        theme.colors.other.icon.product[variant][
          disabled ? 'fillStrongDisabled' : 'fillStrong'
        ]
      }`};
  }

  path[fill].fillWeak {
    fill: ${({ theme, variant, disabled }) =>
      `${
        theme.colors.other.icon.product[variant][
          disabled ? 'fillWeakDisabled' : 'fillWeak'
        ]
      }`};
  }
`

/**
 * ProductIcon component is used to render a set of icons that are linked to a product or service.
 * Those icons are made of multiple colors that changes automatically based on the current theme.
 */
export const ProductIcon = ({
  name,
  variant = 'primary',
  disabled,
  size = 'small',
}: ProductIconProps) => (
  <StyledIcon
    variant={variant}
    disabled={disabled}
    size={size}
    viewBox="0 0 64 64"
  >
    {PRODUCT_ICONS[name]}
  </StyledIcon>
)
