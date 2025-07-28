import type { StoryFn } from '@storybook/react-vite'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { ProgressBar } from '..'

export const Direction: StoryFn = props => (
  <Stack gap={3}>
    <ProgressBar {...props} direction="row" />
    <ProgressBar {...props} direction="column" />
  </Stack>
)

Direction.args = {
  label: 'Label',
  labelDescription: (
    <Badge sentiment="primary" size="small">
      New
    </Badge>
  ),
  value: 40,
}

Direction.parameters = {
  docs: {
    description: {
      story: 'Label and progression can be placed using prop `direction`',
    },
  },
}
