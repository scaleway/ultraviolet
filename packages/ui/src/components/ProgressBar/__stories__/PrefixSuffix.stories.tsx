import type { StoryFn } from '@storybook/react'
import { ProgressBar } from '..'
import { Stack } from '../../Stack'

export const PrefixSuffix: StoryFn = props => (
  <Stack gap={2}>
    <ProgressBar
      {...props}
      label="Prefix"
      value={30}
      prefix="Value : "
      suffix={false}
    />
    <ProgressBar {...props} label="Suffix" value={30} suffix="/100" />
  </Stack>
)

PrefixSuffix.args = {
  direction: 'column',
  showProgress: true,
}
PrefixSuffix.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]

PrefixSuffix.parameters = {
  docs: {
    description: {
      story:
        'When `showProgress` is set to `true`, it is possible to chose a prefix and/or a suffix. By default, there `suffix = %` (to disable it, set it to false)',
    },
  },
}
