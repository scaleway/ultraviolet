import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { TimeInputField } from '..'
import { Submit } from '../../Submit'

export const TimeFormat: StoryFn<ComponentProps<typeof TimeInputField>> = args => (
  <Stack gap={1}>
    <TimeInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

TimeFormat.args = {
  label: '12-hour format',
  timeFormat: 12,
} as const
