import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../../Submit'
import { NumberInputField } from '..'

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
