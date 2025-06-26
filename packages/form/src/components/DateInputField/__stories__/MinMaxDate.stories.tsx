import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { DateInputField } from '..'
import { Submit } from '../../Submit'

export const MinMaxDate: StoryFn<
  ComponentProps<typeof DateInputField>
> = args => (
  <Stack gap={1}>
    <DateInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

MinMaxDate.args = {
  maxDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  minDate: new Date(),
  name: 'date',
  required: true,
}
