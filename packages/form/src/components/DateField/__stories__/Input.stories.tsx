import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { DateField } from '..'
import { Submit } from '../../Submit'

export const Input: StoryFn<ComponentProps<typeof DateField>> = args => (
  <Stack gap={1}>
    <DateField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Input.args = {
  name: 'date',
  required: true,
  input: 'calendar',
}
