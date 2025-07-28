import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { ProgressBar } from '..'

export const Max: StoryFn = props => (
  <Stack gap={2}>
    <ProgressBar {...props} label="Max = 5, value = 3" max={5} value={3} />
    <ProgressBar
      {...props}
      label="Max = 5, value = 3, no suffix"
      max={5}
      suffix={false}
      value={3}
    />
    <ProgressBar
      {...props}
      label="Max = 5, with custom suffix"
      max={5}
      suffix="/5"
      value={3.5}
    />

    <ProgressBar
      {...props}
      label="Max = 5, with custom prefix and suffix"
      max={5}
      prefix="Value : "
      suffix="/5 GB"
      value={2}
    />
  </Stack>
)

Max.args = {
  direction: 'column',
  label: 'Label',
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
