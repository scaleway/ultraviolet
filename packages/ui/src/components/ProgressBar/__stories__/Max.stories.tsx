import type { StoryFn } from '@storybook/react'
import { ProgressBar } from '..'
import { Stack } from '../../Stack'

export const Max: StoryFn = props => (
  <Stack gap={2}>
    <ProgressBar {...props} label="Max = 5, value = 3" value={3} max={5} />
    <ProgressBar
      {...props}
      label="Max = 5, value = 3, no suffix"
      value={3}
      max={5}
      suffix={false}
    />
    <ProgressBar
      {...props}
      label="Max = 5, with custom suffix"
      value={3.5}
      suffix="/5"
      max={5}
    />

    <ProgressBar
      {...props}
      label="Max = 5, with custom prefix and suffix"
      value={2}
      max={5}
      prefix="Value : "
      suffix="/5 GB"
    />
  </Stack>
)

Max.args = {
  label: 'Label',
  direction: 'column',
  showProgress: true,
}
Max.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]

Max.parameters = {
  docs: {
    description: {
      story:
        'Set a custom `max` value to the progress (by default, `max = 100`)',
    },
  },
}
