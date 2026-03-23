import { Key } from '..'
import { Stack } from '../../Stack'

import type { StoryFn } from '@storybook/react-vite'

export const Prominence: StoryFn<typeof Key> = props => (
  <Stack gap="1">
    <Stack direction="row" gap="0.5">
      Prominence default (default value):
      <Key {...props} sentiment="neutral" />
      <Key {...props} sentiment="primary" />
    </Stack>
    <Stack direction="row" gap="0.5">
      Strong:
      <Key {...props} prominence="strong" sentiment="neutral" />
      <Key {...props} prominence="strong" sentiment="primary" />
    </Stack>
  </Stack>
)

Prominence.args = {
  children: 'A',
}
