import styled from '@emotion/styled'
import type { FunctionComponent, SVGProps } from 'react'
import { CATEGORY_ICONS } from './Icons'

const StyledIcon = (
  component: FunctionComponent<SVGProps<SVGSVGElement>>,
) => styled(component, {
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

type CategoryIconProps = {
  name: keyof typeof CATEGORY_ICONS
  variant: 'primary' | 'neutral'
  disabled?: boolean
}

/**
 * CategoryIcon component is used to render category icons, those icons are more complex than system icons
 * as they involve multiple colors that changes depending on theme.
 */
export const CategoryIcon = ({
  name,
  variant = 'primary',
  disabled,
}: CategoryIconProps) => {
  const Icon = StyledIcon(CATEGORY_ICONS[name])

  return (
    <Icon
      width="20"
      height="20"
      viewBox="0 0 20 20"
      variant={variant}
      disabled={disabled}
    />
  )
}
