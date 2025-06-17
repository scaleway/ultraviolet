import type { StoryFn } from '@storybook/react'
import { MosaicIcon } from '@ultraviolet/icons'
import { Avatar } from '..'
import { Stack } from '../../Stack'

export const Size: StoryFn<typeof Avatar> = props => (
  <Stack gap={2}>
    <Stack gap={2} direction="row">
      <>
        <Avatar {...props} />
        <Avatar variant="text" text="UV" shape="circle" size="medium" />
        <Avatar variant="text" text="UV" shape="circle" size="small" />
        <Avatar variant="text" text="UV" shape="circle" size="xsmall" />
      </>
      <>
        <Avatar variant="icon" shape="circle" size="large">
          <MosaicIcon />
        </Avatar>
        <Avatar variant="icon" shape="circle" size="medium">
          <MosaicIcon />
        </Avatar>
        <Avatar variant="icon" shape="circle" size="small">
          <MosaicIcon />
        </Avatar>
        <Avatar variant="icon" shape="circle" size="xsmall">
          <MosaicIcon />
        </Avatar>
      </>
    </Stack>
    <Stack gap={2} direction="row">
      <>
        <Avatar variant="text" text="UV" shape="square" size="large" />
        <Avatar variant="text" text="UV" shape="square" size="medium" />
        <Avatar variant="text" text="UV" shape="square" size="small" />
        <Avatar variant="text" text="UV" shape="square" size="xsmall" />
      </>
      <>
        <Avatar variant="icon" shape="square" size="large">
          <MosaicIcon />
        </Avatar>
        <Avatar variant="icon" shape="square" size="medium">
          <MosaicIcon />
        </Avatar>
        <Avatar variant="icon" shape="square" size="small">
          <MosaicIcon />
        </Avatar>
        <Avatar variant="icon" shape="square" size="xsmall">
          <MosaicIcon />
        </Avatar>
      </>
    </Stack>
  </Stack>
)

Size.args = {
  variant: 'text',
  text: 'UV',
  shape: 'circle',
  size: 'large',
}

Size.parameters = {
  docs: {
    description: {
      story:
        'Using prop `size` you can change the size of the avatar. When variant is set to `icon` the icon size will automatically scale based on avatar size.',
    },
  },
}

Size.decorators = [
  Story => (
    <Stack gap={2} direction="row">
      <Story />
    </Stack>
  ),
]
