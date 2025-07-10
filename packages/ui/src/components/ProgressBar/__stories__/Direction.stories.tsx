import type { StoryFn } from '@storybook/react-vite'
import { ProgressBar } from '..'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'

export const Direction: StoryFn = props => (
  <Stack gap={3}>
    <ProgressBar {...props} direction="row" />
    <ProgressBar {...props} direction="column" />
  </Stack>
)

Direction.args = {
  value: 40,
  labelDescription: (
    <Badge sentiment="primary" size="small">
      New
    </Badge>
  ),
  label: 'Label',
}

Direction.parameters = {
  docs: {
    description: {
      story: 'Label and progression can be placed using prop `direction`',
    },
  },
}
