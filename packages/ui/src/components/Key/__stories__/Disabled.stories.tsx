import { Key } from '..'
import { Stack } from '../../Stack'

import type { StoryFn } from '@storybook/react-vite'

export const Disabled: StoryFn<typeof Key> = props => (
  <Stack direction="row" gap="0.5">
    <Key {...props} disabled sentiment="neutral" />
    <Key {...props} disabled sentiment="primary" />
  </Stack>
)

Disabled.args = {
  children: 'A',
}
