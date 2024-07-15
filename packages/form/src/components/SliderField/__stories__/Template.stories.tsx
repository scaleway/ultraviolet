import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { SliderField } from '..'

export const Template: StoryFn<ComponentProps<typeof SliderField>> = args => (
  <SliderField {...args} />
)
