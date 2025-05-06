import type { StoryFn } from '@storybook/react'
import { MosaicIcon } from '@ultraviolet/icons'
import { AvatarV2 } from '..'
import { Stack } from '../../Stack'

export const Size: StoryFn<typeof AvatarV2> = props => (
  <Stack gap={2}>
    <Stack gap={2} direction="row">
      <>
        <AvatarV2 {...props} />
        <AvatarV2 variant="text" text="UV" shape="circle" size="medium" />
        <AvatarV2 variant="text" text="UV" shape="circle" size="small" />
        <AvatarV2 variant="text" text="UV" shape="circle" size="xsmall" />
      </>
      <>
        <AvatarV2 variant="icon" shape="circle" size="large">
          <MosaicIcon />
        </AvatarV2>
        <AvatarV2 variant="icon" shape="circle" size="medium">
          <MosaicIcon />
        </AvatarV2>
        <AvatarV2 variant="icon" shape="circle" size="small">
          <MosaicIcon />
        </AvatarV2>
        <AvatarV2 variant="icon" shape="circle" size="xsmall">
          <MosaicIcon />
        </AvatarV2>
      </>
    </Stack>
    <Stack gap={2} direction="row">
      <>
        <AvatarV2 variant="text" text="UV" shape="square" size="large" />
        <AvatarV2 variant="text" text="UV" shape="square" size="medium" />
        <AvatarV2 variant="text" text="UV" shape="square" size="small" />
        <AvatarV2 variant="text" text="UV" shape="square" size="xsmall" />
      </>
      <>
        <AvatarV2 variant="icon" shape="square" size="large">
          <MosaicIcon />
        </AvatarV2>
        <AvatarV2 variant="icon" shape="square" size="medium">
          <MosaicIcon />
        </AvatarV2>
        <AvatarV2 variant="icon" shape="square" size="small">
          <MosaicIcon />
        </AvatarV2>
        <AvatarV2 variant="icon" shape="square" size="xsmall">
          <MosaicIcon />
        </AvatarV2>
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
