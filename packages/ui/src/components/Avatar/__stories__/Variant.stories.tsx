import type { StoryFn } from '@storybook/react-vite'
import { MosaicIcon } from '@ultraviolet/icons/MosaicIcon'
import { Stack } from '../../Stack'
import { Avatar } from '..'
import avatar from './assets/avatar.svg'

export const Variant: StoryFn<typeof Avatar> = props => (
  <>
    <Avatar {...props} />
    <Avatar shape="circle" variant="user" />
    <Avatar image={avatar} shape="square" size="large" variant="image" />
    <Avatar sentiment="primary" shape="circle" variant="icon">
      <MosaicIcon size="xlarge" />
    </Avatar>
    <Avatar colors={['primary', 'secondary']} shape="circle" variant="colors" />
  </>
)

Variant.args = {
  shape: 'circle',
  text: 'UV',
  variant: 'text',
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
    <Stack direction="row" gap={2}>
      <Story />
    </Stack>
  ),
]
