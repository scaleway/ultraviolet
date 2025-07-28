import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Avatar } from '..'

export const Shape: StoryFn<typeof Avatar> = props => (
  <>
    <Avatar {...props} />
    <Avatar {...props} shape="square" />
  </>
)

Shape.args = {
  variant: 'text',
  text: 'UV',
  size: 'medium',
  shape: 'circle',
}

Shape.parameters = {
  docs: {
    description: {
      story: 'The `shape` prop can be used to change the shape of the avatar.',
    },
  },
}

Shape.decorators = [
  Story => (
    <Stack gap={2} direction="row">
      <Story />
    </Stack>
  ),
]
