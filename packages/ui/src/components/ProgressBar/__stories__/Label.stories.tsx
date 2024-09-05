import type { StoryFn } from '@storybook/react'
import { ProgressBar } from '..'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'

export const Label: StoryFn = props => (
  <Stack gap={3}>
    <ProgressBar {...props} direction="row" />
    <ProgressBar {...props} direction="column" />
  </Stack>
)

Label.args = {
  value: 40,
  labelDescription: (
    <Badge sentiment="primary" size="small">
      New
    </Badge>
  ),
  label: 'Label',
}

Label.parameters = {
  docs: {
    description: {
      story:
        'Label can be placed using prop `direction` and it is possible to add more information using prop `labelDescription`',
    },
  },
}
