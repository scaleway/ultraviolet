import type { StoryFn } from '@storybook/react-vite'
import { StarIcon } from '@ultraviolet/icons'
import { Avatar } from '..'
import { Stack } from '../../../Layout/Stack'
import { ICON_SIZE_BY_AVATAR_SIZE, SIZES } from '../constants'

export const Size: StoryFn<typeof Avatar> = props => (
  <Stack gap={2}>
    <Stack direction="row" gap={2}>
      {SIZES.map(size => (
        <Avatar
          key={size}
          shape="square"
          variant="text"
          text={props.text || 'UV'}
          size={size}
          sentiment={props.sentiment}
          upload={props.upload}
        />
      ))}
    </Stack>
    <Stack direction="row" gap={2}>
      {SIZES.map(size => (
        <Avatar key={size} shape="circle" variant="icon" size={size} sentiment={props.sentiment} upload={props.upload}>
          <StarIcon size={ICON_SIZE_BY_AVATAR_SIZE[size]} />
        </Avatar>
      ))}
    </Stack>
  </Stack>
)

Size.args = {
  text: 'UV',
}

Size.parameters = {
  docs: {
    description: {
      story:
        'Using the prop `size` you can change the size of the avatar. Make sure to use the right icon size corresponding to the Avatar size.',
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
