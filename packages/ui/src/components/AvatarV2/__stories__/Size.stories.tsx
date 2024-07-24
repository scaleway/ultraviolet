import type { StoryFn } from '@storybook/react'
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
        <AvatarV2 variant="icon" icon="mosaic" shape="circle" size="large" />
        <AvatarV2 variant="icon" icon="mosaic" shape="circle" size="medium" />
        <AvatarV2 variant="icon" icon="mosaic" shape="circle" size="small" />
        <AvatarV2 variant="icon" icon="mosaic" shape="circle" size="xsmall" />
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
        <AvatarV2 variant="icon" icon="mosaic" shape="square" size="large" />
        <AvatarV2 variant="icon" icon="mosaic" shape="square" size="medium" />
        <AvatarV2 variant="icon" icon="mosaic" shape="square" size="small" />
        <AvatarV2 variant="icon" icon="mosaic" shape="square" size="xsmall" />
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
