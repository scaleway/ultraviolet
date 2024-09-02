import styled from '@emotion/styled'

const StyledIcon = styled('svg', {
  shouldForwardProp: prop => !['variant', 'disabled'].includes(prop),
})<{ variant: 'neutral' | 'primary'; disabled?: boolean }>`
  .fill {
    fill: ${({ theme, variant, disabled }) =>
      theme.colors.other.icon.category[variant][
        disabled ? 'fillDisabled' : 'fill'
      ]};
  }

  .fillStrong {
    fill: ${({ theme, variant, disabled }) =>
      theme.colors.other.icon.category[variant][
        disabled ? 'fillStrongDisabled' : 'fillStrong'
      ]};
  }
`

export type IconProps = {
  variant?: 'primary' | 'neutral'
  disabled?: boolean
}

/**
 * CategoryIcon component is used to render category icons, those icons are more complex than system icons
 * as they involve multiple colors that changes depending on theme.
 */
export const Icon = ({ variant = 'primary', disabled }: IconProps) => (
  <StyledIcon
    width="20"
    height="20"
    viewBox="0 0 20 20"
    variant={variant}
    disabled={disabled}
  />
)
