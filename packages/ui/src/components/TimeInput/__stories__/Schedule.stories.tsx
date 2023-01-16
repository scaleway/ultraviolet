import type { Story } from '@storybook/react'
import { TimeInput, schedules } from '..'
import { Stack } from '../../Stack'

export const Schedule: Story = props => (
  <>
    {Object.keys(schedules).map(schedule => (
      <TimeInput
        name={`timeinput-test-${schedule}`}
        placeholder={`Schedule ${schedule}`}
        schedule={schedule as keyof typeof schedules}
        {...props}
      />
    ))}
  </>
)

Schedule.parameters = {
  docs: {
    storyDescription:
      'You can adjust the time between options with the `schedule` props. `hours`, `half` and `quarter` are available. By default, the `hours` option is selected.',
  },
}

Schedule.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <StoryComponent />
    </Stack>
  ),
]
