import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../../Submit'
import { DateInputField } from '..'

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
