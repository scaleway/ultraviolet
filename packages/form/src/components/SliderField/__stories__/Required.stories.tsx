import { Stack } from '@ultraviolet/ui'

import { SliderField } from '..'
import { Submit } from '../../Submit'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Required: StoryFn<ComponentProps<typeof SliderField>> = args => (
  <Stack gap={1}>
    <SliderField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  label: 'This slider is required',
  name: 'required-slider',
  required: true,
}
