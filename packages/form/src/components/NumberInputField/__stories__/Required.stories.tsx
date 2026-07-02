import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { NumberInputField } from '..'

export const Required: StoryFn<ComponentProps<typeof NumberInputField>> = args => <NumberInputField {...args} />

Required.args = {
  label: 'This field is required',
  name: 'value',
  required: true,
  step: 1,
}
