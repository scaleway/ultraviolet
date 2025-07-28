import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { ProgressBar } from '..'

export const PrefixSuffix: StoryFn = props => (
  <Stack gap={2}>
    <ProgressBar
      {...props}
      label="Prefix"
      prefix="Value : "
      suffix={false}
      value={30}
    />
    <ProgressBar {...props} label="Suffix" suffix="/100" value={30} />
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
