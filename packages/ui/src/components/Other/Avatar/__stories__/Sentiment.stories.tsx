import type { StoryFn } from '@storybook/react-vite'
import { StarIcon } from '@ultraviolet/icons'
import { Avatar } from '..'
import { Stack } from '../../../Layout/Stack'

export const Sentiment: StoryFn<typeof Avatar> = props => (
  <>
    <Avatar {...props} />
    <Avatar sentiment="neutral" shape="circle" text="UV" variant="text" />
    <Avatar shape="circle" variant="icon">
      <StarIcon size="xlarge" />
    </Avatar>
    <Avatar sentiment="neutral" shape="circle" variant="icon">
      <StarIcon size="xlarge" />
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
      story: 'The `sentiment` prop can be used to change the sentiment of the avatar with variants `text` and `icon`.',
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
