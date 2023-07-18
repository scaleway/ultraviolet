import styled from '@emotion/styled'
import { CATEGORY_ICONS } from './Icons'

const StyledIcon = styled.svg`
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

export const CategoryIcon = ({ name }: CategoryIconProps) => (
  <StyledIcon width="20" height="20" viewBox="0 0 20 20">
    {CATEGORY_ICONS[name]}
  </StyledIcon>
)
