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
  shape: 'circle',
  size: 'medium',
  text: 'UV',
  variant: 'text',
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
    <Stack direction="row" gap={2}>
      <Story />
    </Stack>
  ),
]
