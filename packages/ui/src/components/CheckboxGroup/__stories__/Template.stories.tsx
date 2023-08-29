import type { StoryFn } from '@storybook/react'
import { CheckboxGroup } from '..'

export const Template: StoryFn<typeof CheckboxGroup> = args => (
  <CheckboxGroup {...args}>
    <CheckboxGroup.Checkbox name="checkbox-1" value="value-1">
      Checkbox 1
    </CheckboxGroup.Checkbox>
    <CheckboxGroup.Checkbox name="checkbox-2" value="value-2">
      Checkbox 2
    </CheckboxGroup.Checkbox>
  </CheckboxGroup>
)

Template.args = {
  name: 'template',
  legend: 'Legend label',
  value: ['value-2'],
}
