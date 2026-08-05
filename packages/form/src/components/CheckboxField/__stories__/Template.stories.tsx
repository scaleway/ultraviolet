import type { StoryFn } from '@storybook/react-vite'
import type { ComponentType } from 'react'
import { CheckboxField } from '..'

export const Template: StoryFn<typeof CheckboxField> = args => {
  const Component = CheckboxField as ComponentType<Record<string, unknown>>
  return <Component {...args}>Checkbox</Component>
}
