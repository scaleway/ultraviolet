import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Key } from '..'

export const Disabled: StoryFn<typeof Key> = props => (
  <Stack direction="row" gap="0.5">
    <Key {...props} disabled sentiment="neutral" />
    <Key {...props} disabled sentiment="primary" />
  </Stack>
)

Disabled.args = {
  children: 'A',
}
