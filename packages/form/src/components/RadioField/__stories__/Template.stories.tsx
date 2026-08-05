import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps, ComponentType } from 'react'
import { RadioField } from '..'

export const Template: StoryFn<ComponentProps<typeof RadioField>> = args => {
  const Component = RadioField as ComponentType<Record<string, unknown>>
  return <Component {...args} label="Option 1" />
}
