import { Stack } from '@ultraviolet/ui'

import { DateInputField } from '..'
import { Submit } from '../../Submit'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const MinMaxDateRange: StoryFn<
  ComponentProps<typeof DateInputField>
> = args => (
  <Stack gap={1}>
    <DateInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

MinMaxDateRange.args = {
  maxDate: new Date(Date.now()),
  // A month ago
  minDate: new Date(Date.now() - 60 * 60 * 24 * 30 * 1000),
  name: 'date',
  required: true,
  selectsRange: true,
}
