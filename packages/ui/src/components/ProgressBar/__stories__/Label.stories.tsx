import type { StoryFn } from '@storybook/react'
import { ProgressBar } from '..'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'

export const Label: StoryFn = props => (
  <Stack gap={3}>
    <ProgressBar {...props} labelDescription="New" />
    <ProgressBar
      {...props}
      labelDescription={
        <Badge sentiment="primary" size="small">
          New
        </Badge>
      }
    />
    <ProgressBar value={30} showProgress />
  </Stack>
)

Label.args = {
  value: 40,
  label: 'Label',
}

Label.parameters = {
  docs: {
    description: {
      story:
        'Add a label to the progress bar using prop `label` and add more information using prop `labelDescription`',
    },
  },
}
