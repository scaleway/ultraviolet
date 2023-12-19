import styled from '@emotion/styled'
import { CATEGORY_ICONS } from './Icons'

const StyledIcon = (component: Parameters<typeof styled>[0]) => styled(
  component,
)`
  .fill {
    fill: ${({ theme }) => theme.colors.other.icon.category.primary.fill};
  }

  .fillStrong {
    fill: ${({ theme }) => theme.colors.other.icon.category.primary.fillStrong};
  }
`

type CategoryIconProps = {
  name: keyof typeof CATEGORY_ICONS
}

/**
 * CategoryIcon component is used to render category icons, those icons are more complex than system icons
 * as they involve multiple colors that changes depending on theme.
 */
export const CategoryIcon = ({ name }: CategoryIconProps) => {
  const Icon = StyledIcon(CATEGORY_ICONS[name])

  return <Icon width="20" height="20" viewBox="0 0 20 20" />
}
