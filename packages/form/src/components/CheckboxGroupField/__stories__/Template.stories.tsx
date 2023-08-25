import type { StoryFn } from '@storybook/react'
import { CheckboxGroupField } from '..'

export const Template: StoryFn<typeof CheckboxGroupField> = args => (
  <CheckboxGroupField {...args}>
    <CheckboxGroupField.Checkbox name="checkbox-1" value="value-1">
      Checkbox 1
    </CheckboxGroupField.Checkbox>
    <CheckboxGroupField.Checkbox name="checkbox-2" value="value-2">
      Checkbox 2
    </CheckboxGroupField.Checkbox>
  </CheckboxGroupField>
)

Template.args = {
  name: 'template',
  label: 'Legend label',
  value: ['value-2'],
}
