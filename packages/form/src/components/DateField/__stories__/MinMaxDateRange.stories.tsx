import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { DateField } from '..'
import { Submit } from '../../Submit'

export const MinMaxDateRange: StoryFn<
  ComponentProps<typeof DateField>
> = args => (
  <Stack gap={1}>
    <DateField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

MinMaxDateRange.args = {
  // A month ago
  minDate: new Date(Date.now() - 60 * 60 * 24 * 30 * 1000),
  maxDate: new Date(Date.now()),
  name: 'date',
  required: true,
  selectsRange: true,
}
