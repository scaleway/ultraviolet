import type { StoryFn } from '@storybook/react'
import { MosaicIcon } from '@ultraviolet/icons'
import { AvatarV2 } from '..'
import { Stack } from '../../Stack'
import avatar from './assets/avatar.svg'

export const Variant: StoryFn<typeof AvatarV2> = props => (
  <>
    <AvatarV2 {...props} />
    <AvatarV2 variant="user" shape="circle" />
    <AvatarV2 variant="image" size="large" shape="square" image={avatar} />
    <AvatarV2 variant="icon" shape="circle" sentiment="primary">
      <MosaicIcon size="xlarge" />
    </AvatarV2>
    <AvatarV2
      variant="colors"
      shape="circle"
      colors={['primary', 'secondary']}
    />
  </>
)

Variant.args = {
  variant: 'text',
  text: 'UV',
  shape: 'circle',
}

Variant.parameters = {
  docs: {
    description: {
      story:
        "Avatar has different variants like `text`, `image`, `icon`, and `colors`.\n\n- `text` variant is used to display initials of the user.\n- `user` variant is used to display a user product icon. **Only the shape can be changed**.\n- `image` variant is used to display user profile image.\n- `icon` variant is used to display icons.\n- `colors` variant is used to display a set of 1 or 2 colors. You can define those colors passing prop `colors=['#ffffff', '#000000']`.\n\nYou can change the variant using the `variant` prop.",
    },
  },
}

Variant.decorators = [
  Story => (
    <Stack gap={2} direction="row">
      <Story />
    </Stack>
  ),
]
