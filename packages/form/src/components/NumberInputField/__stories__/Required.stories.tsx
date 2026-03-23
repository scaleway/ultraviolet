import { Stack } from '@ultraviolet/ui'

import { NumberInputField } from '..'
import { Submit } from '../../Submit'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Required: StoryFn<
  ComponentProps<typeof NumberInputField>
> = args => (
  <Stack gap={1}>
    <NumberInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  label: 'This field is required',
  name: 'value',
  required: true,
  step: 1,
}
