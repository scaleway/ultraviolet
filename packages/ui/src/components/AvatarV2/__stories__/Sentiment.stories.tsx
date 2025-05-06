import type { StoryFn } from '@storybook/react'
import { MosaicIcon } from '@ultraviolet/icons'
import { AvatarV2 } from '..'
import { Stack } from '../../Stack'

export const Sentiment: StoryFn<typeof AvatarV2> = props => (
  <>
    <AvatarV2 {...props} />
    <AvatarV2 variant="text" text="UV" shape="circle" sentiment="neutral" />
    <AvatarV2 variant="icon" shape="circle">
      <MosaicIcon />
    </AvatarV2>
    <AvatarV2 variant="icon" shape="circle" sentiment="neutral">
      <MosaicIcon />
    </AvatarV2>
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
