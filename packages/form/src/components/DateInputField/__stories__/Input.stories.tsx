import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { DateInputField } from '..'
import { Submit } from '../../Submit'

export const Input: StoryFn<ComponentProps<typeof DateInputField>> = args => (
  <Stack gap={1}>
    <DateInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Input.args = {
  name: 'date',
  required: true,
  input: 'calendar',
}
