import { CheckboxField } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof CheckboxField> = args => (
  <CheckboxField {...args}>Checkbox</CheckboxField>
)
