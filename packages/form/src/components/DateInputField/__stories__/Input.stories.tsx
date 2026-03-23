import { Stack } from '@ultraviolet/ui'

import { DateInputField } from '..'
import { Submit } from '../../Submit'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

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
