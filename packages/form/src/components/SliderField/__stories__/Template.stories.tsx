import { SliderField } from '..'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<ComponentProps<typeof SliderField>> = args => (
  <SliderField {...args} />
)
