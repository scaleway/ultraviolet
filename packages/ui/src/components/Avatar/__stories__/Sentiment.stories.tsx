import type { StoryFn } from '@storybook/react-vite'
import { MosaicIcon } from '@ultraviolet/icons/MosaicIcon'
import { Stack } from '../../Stack'
import { Avatar } from '..'

export const Sentiment: StoryFn<typeof Avatar> = props => (
  <>
    <Avatar {...props} />
    <Avatar sentiment="neutral" shape="circle" text="UV" variant="text" />
    <Avatar shape="circle" variant="icon">
      <MosaicIcon />
    </Avatar>
    <Avatar sentiment="neutral" shape="circle" variant="icon">
      <MosaicIcon />
    </Avatar>
  </>
)

Sentiment.args = {
  sentiment: 'primary',
  shape: 'circle',
  text: 'UV',
  variant: 'text',
}

Sentiment.parameters = {
  docs: {
    description: {
      story:
        'The `sentiment` prop can be used to change the sentiment of the avatar with variants `text` and `icon`.',
    },
  },
}

Sentiment.decorators = [
  Story => (
    <Stack direction="row" gap={2}>
      <Story />
    </Stack>
  ),
]
