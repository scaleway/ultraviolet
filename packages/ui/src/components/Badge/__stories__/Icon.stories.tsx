import { InformationOutlineIcon } from '@ultraviolet/icons/InformationOutlineIcon'

import { Badge } from '..'

import type { StoryFn } from '@storybook/react-vite'

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
