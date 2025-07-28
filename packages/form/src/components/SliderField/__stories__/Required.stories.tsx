import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../../Submit'
import { SliderField } from '..'

export const Required: StoryFn<ComponentProps<typeof SliderField>> = args => (
  <Stack gap={1}>
    <SliderField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'required-slider',
  required: true,
  label: 'This slider is required',
}
