import { Story } from '@storybook/react'
import TimeInput, { schedules } from '..'

export const Schedule: Story = props => (
  <>
    {Object.keys(schedules).map(schedule => (
      <div style={{ marginBottom: '16px' }}>
        <TimeInput
          name={`timeinput-test-${schedule}`}
          placeholder={`Schedule ${schedule}`}
          schedule={schedule as keyof typeof schedules}
          {...props}
        />
      </div>
    ))}
  </>
)

Schedule.parameters = {
  docs: {
    storyDescription:
      'You can adjust the time between options with the `schedule` props. `hours`, `half` and `quarter` are available. By default, the `hours` option is selected.',
  },
}
