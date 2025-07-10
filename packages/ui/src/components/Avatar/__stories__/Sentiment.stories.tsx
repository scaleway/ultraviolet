import type { StoryFn } from '@storybook/react-vite'
import { MosaicIcon } from '@ultraviolet/icons'
import { Avatar } from '..'
import { Stack } from '../../Stack'

export const Sentiment: StoryFn<typeof Avatar> = props => (
  <>
    <Avatar {...props} />
    <Avatar variant="text" text="UV" shape="circle" sentiment="neutral" />
    <Avatar variant="icon" shape="circle">
      <MosaicIcon />
    </Avatar>
    <Avatar variant="icon" shape="circle" sentiment="neutral">
      <MosaicIcon />
    </Avatar>
  </>
)

Sentiment.args = {
  variant: 'text',
  text: 'UV',
  shape: 'circle',
  sentiment: 'primary',
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
    <Stack gap={2} direction="row">
      <Story />
    </Stack>
  ),
]
