import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Key } from '..'

export const Size: StoryFn<typeof Key> = props => (
  <Stack gap="1">
    <Stack direction="row" gap="0.5">
      Medium (default) :
      <Key {...props} size="medium" />
    </Stack>
    <Stack direction="row" gap="0.5">
      Small:
      <Key {...props} size="small" />
    </Stack>
  </Stack>
)

Size.args = {
  children: 'A',
}
