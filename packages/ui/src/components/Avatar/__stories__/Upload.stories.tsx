import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Avatar } from '..'

export const Upload: StoryFn<typeof Avatar> = props => (
  <>
    <Avatar {...props} />
    <Avatar {...props} shape="square" />
  </>
)

Upload.args = {
  onClick: () => alert('Upload avatar'),
  shape: 'circle',
  text: 'UV',
  upload: true,
  variant: 'text',
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
    <Stack direction="row" gap={2}>
      <Story />
    </Stack>
  ),
]
