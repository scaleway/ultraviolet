import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Key } from '..'

export const Sentiment: StoryFn<typeof Key> = props => (
  <Stack>
    <Stack direction="row" gap="0.5">
      Neutral (default value):
      <Key {...props} sentiment="neutral" />
    </Stack>
    <Stack direction="row" gap="0.5">
      Primary:
      <Key {...props} sentiment="primary" />
    </Stack>
  </Stack>
)

Sentiment.args = {
  children: 'A',
}
