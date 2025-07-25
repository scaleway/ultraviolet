import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { CheckboxField } from '..'
import { Submit } from '../../Submit'

export const Required: StoryFn<ComponentProps<typeof CheckboxField>> = args => (
  <Stack gap={1}>
    <CheckboxField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'required',
  required: true,
  children: 'Checkbox required',
}
