import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { RadioField } from '..'

export const Template: StoryFn<ComponentProps<typeof RadioField>> = args => (
  <RadioField {...args} label="Option 1" />
)
