import { Stack } from '@ultraviolet/ui'

import { CheckboxField } from '..'
import { Submit } from '../../Submit'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Required: StoryFn<ComponentProps<typeof CheckboxField>> = args => (
  <Stack gap={1}>
    <CheckboxField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  children: 'Checkbox required',
  name: 'required',
  required: true,
}
