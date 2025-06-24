import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { DateInputField } from '..'
import { Submit } from '../../Submit'

export const Clearable: StoryFn<
  ComponentProps<typeof DateInputField>
> = args => (
  <Stack gap={1}>
    <DateInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Clearable.args = {
  name: 'date',
  required: true,
  clearable: true,
}
