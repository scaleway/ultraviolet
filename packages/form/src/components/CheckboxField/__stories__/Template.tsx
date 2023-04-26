import type { ComponentStory } from '@storybook/react'
import { CheckboxField } from '..'

export const Template: ComponentStory<typeof CheckboxField> = args => (
  <CheckboxField {...args}>Checkbox</CheckboxField>
)
