import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { TimeInput } from '..'

export const TimeFormat: StoryFn<typeof TimeInput> = () => {
  const defaultDate = new Date()
  defaultDate.setHours(13, 34, 0)

  return (
    <Stack gap="2">
      <TimeInput label="12-hour format" timeFormat={12} value={defaultDate} />
      <TimeInput label="24-hour format" timeFormat={24} value={defaultDate} />
    </Stack>
  )
}
