import type { StoryFn } from '@storybook/react'
import { Avatar } from '..'
import { Stack } from '../../Stack'

export const Upload: StoryFn<typeof Avatar> = props => (
  <>
    <Avatar {...props} />
    <Avatar {...props} shape="square" />
  </>
)

Upload.args = {
  variant: 'text',
  text: 'UV',
  shape: 'circle',
  upload: true,
  onClick: () => alert('Upload avatar'),
}

Upload.parameters = {
  docs: {
    description: {
      story:
        'You can use the prop `upload` to display an overlay on hover. `upload` is a boolean prop, so you can just add it like `upload={true}`.\n\n **Note:** you will need to implement a behavior using `onClick` function in addition to decide what to do when the avatar is clicked.',
    },
  },
}

Upload.decorators = [
  Story => (
    <Stack gap={2} direction="row">
      <Story />
    </Stack>
  ),
]
