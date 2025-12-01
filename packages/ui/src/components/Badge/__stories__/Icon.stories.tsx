import type { StoryFn } from '@storybook/react-vite'
import { InformationOutlineIcon } from '@ultraviolet/icons'
import { Badge } from '..'

export const Icon: StoryFn = props => (
  <Badge {...props}>
    <InformationOutlineIcon
      size={
        props['size'] === 'xsmall' || props['size'] === 'small'
          ? 'xsmall'
          : 'small'
      }
    />
    Badge
  </Badge>
)
Icon.args = {
  sentiment: 'primary',
}
