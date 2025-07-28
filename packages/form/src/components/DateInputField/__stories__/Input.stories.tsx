import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../../Submit'
import { DateInputField } from '..'

export const Input: StoryFn<ComponentProps<typeof DateInputField>> = args => (
  <Stack gap={1}>
    <DateInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Input.args = {
  input: 'calendar',
  name: 'date',
  required: true,
}
