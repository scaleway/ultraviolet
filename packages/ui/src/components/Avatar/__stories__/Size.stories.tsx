import type { StoryFn } from '@storybook/react-vite'
import { MosaicIcon } from '@ultraviolet/icons/MosaicIcon'
import { Stack } from '../../Stack'
import { Avatar } from '..'

export const Size: StoryFn<typeof Avatar> = props => (
  <Stack gap={2}>
    <Stack direction="row" gap={2}>
      <>
        <Avatar {...props} />
        <Avatar shape="circle" size="medium" text="UV" variant="text" />
        <Avatar shape="circle" size="small" text="UV" variant="text" />
        <Avatar shape="circle" size="xsmall" text="UV" variant="text" />
      </>
      <>
        <Avatar shape="circle" size="large" variant="icon">
          <MosaicIcon />
        </Avatar>
        <Avatar shape="circle" size="medium" variant="icon">
          <MosaicIcon />
        </Avatar>
        <Avatar shape="circle" size="small" variant="icon">
          <MosaicIcon />
        </Avatar>
        <Avatar shape="circle" size="xsmall" variant="icon">
          <MosaicIcon />
        </Avatar>
      </>
    </Stack>
    <Stack direction="row" gap={2}>
      <>
        <Avatar shape="square" size="large" text="UV" variant="text" />
        <Avatar shape="square" size="medium" text="UV" variant="text" />
        <Avatar shape="square" size="small" text="UV" variant="text" />
        <Avatar shape="square" size="xsmall" text="UV" variant="text" />
      </>
      <>
        <Avatar shape="square" size="large" variant="icon">
          <MosaicIcon />
        </Avatar>
        <Avatar shape="square" size="medium" variant="icon">
          <MosaicIcon />
        </Avatar>
        <Avatar shape="square" size="small" variant="icon">
          <MosaicIcon />
        </Avatar>
        <Avatar shape="square" size="xsmall" variant="icon">
          <MosaicIcon />
        </Avatar>
      </>
    </Stack>
  </Stack>
)

Size.args = {
  shape: 'circle',
  size: 'large',
  text: 'UV',
  variant: 'text',
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
    <Stack direction="row" gap={2}>
      <Story />
    </Stack>
  ),
]
