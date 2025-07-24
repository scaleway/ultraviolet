import type { StoryFn } from '@storybook/react-vite'
import { MosaicIcon } from '@ultraviolet/icons'
import { Avatar } from '..'
import { Stack } from '../../Stack'
import avatar from './assets/avatar.svg'

export const Variant: StoryFn<typeof Avatar> = props => (
  <>
    <Avatar {...props} />
    <Avatar variant="user" shape="circle" />
    <Avatar variant="image" size="large" shape="square" image={avatar} />
    <Avatar variant="icon" shape="circle" sentiment="primary">
      <MosaicIcon size="xlarge" />
    </Avatar>
    <Avatar variant="colors" shape="circle" colors={['primary', 'secondary']} />
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
