import type { StoryFn } from '@storybook/react-vite'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { ProgressBar } from '..'

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
    <ProgressBar label="Label" showProgress value={30} />
  </Stack>
)

Label.args = {
  label: 'Label',
  value: 40,
}

Label.parameters = {
  docs: {
    description: {
      story:
        'Add a label to the progress bar using prop `label` and add more information using prop `labelDescription`',
    },
  },
}
