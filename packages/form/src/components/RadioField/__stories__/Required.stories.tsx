import { Stack } from '@ultraviolet/ui'

import { RadioField } from '..'
import { Submit } from '../../Submit'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Required: StoryFn<ComponentProps<typeof RadioField>> = args => (
  <Stack gap={1}>
    <RadioField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  label: 'Option 1',
  name: 'required',
  required: true,
  value: 'required',
}
