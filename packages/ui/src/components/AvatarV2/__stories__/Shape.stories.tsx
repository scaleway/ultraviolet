import type { StoryFn } from '@storybook/react'
import { AvatarV2 } from '..'
import { Stack } from '../../Stack'

export const Shape: StoryFn<typeof AvatarV2> = props => (
  <>
    <AvatarV2 {...props} />
    <AvatarV2 {...props} shape="square" />
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
