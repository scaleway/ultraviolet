import type { StoryFn } from '@storybook/react'
import { CheckboxField } from '..'

export const Template: StoryFn<typeof CheckboxField> = args => (
  <CheckboxField {...args}>Checkbox</CheckboxField>
)
