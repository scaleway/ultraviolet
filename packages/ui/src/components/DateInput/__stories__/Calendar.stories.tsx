import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { DateInput } from '..'

export const Calendar: StoryFn<ComponentProps<typeof DateInput>> = args => {
  const [value, setValue] = useState<Date | null>()

  return (
    <Stack gap={2}>
      <DateInput
        {...args}
        input="calendar"
        label="As a calendar"
        onChange={setValue}
        selectsRange={false}
        value={value}
      />
      Selected date: {value?.toDateString()}
    </Stack>
  )
}

Calendar.args = {
  input: 'calendar',
}

Calendar.decorators = [
  StoryComponent => (
    <div style={{ height: '350px' }}>
      <StoryComponent />
    </div>
  ),
]

Calendar.parameters = {
  docs: {
    description: {
      story:
        'Set prop `input` to "calendar" in order to only display the calendar part of the component (no popover, no text input).',
    },
  },
}
