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

  .fill,
  .fill > * {
    fill: ${({ theme, variant, disabled }) =>
      `${
        theme.colors.other.icon.product[variant][
          disabled ? 'fillDisabled' : 'fill'
        ]
      }`};
  }

  .fillStrong,
  .fillStrong > * {
    fill: ${({ theme, variant, disabled }) =>
      `${
        theme.colors.other.icon.product[variant][
          disabled ? 'fillStrongDisabled' : 'fillStrong'
        ]
      }`};
  }

  .fillWeak,
  .fillWeak > * {
    fill: ${({ theme, variant, disabled }) =>
      `${
        theme.colors.other.icon.product[variant][
          disabled ? 'fillWeakDisabled' : 'fillWeak'
        ]
      }`};
  }
`

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
