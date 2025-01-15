import type { StoryFn } from '@storybook/react'
import { TimeInputV2 } from '..'
import { Stack } from '../../Stack'

export const TimeFormat: StoryFn<typeof TimeInputV2> = () => {
  const defaultDate = new Date()
  defaultDate.setHours(13, 34, 0)

  return (
    <Stack gap="2">
      <TimeInputV2 label="12-hour format" timeFormat={12} value={defaultDate} />
      <TimeInputV2 label="24-hour format" timeFormat={24} value={defaultDate} />
    </Stack>
  )
}
