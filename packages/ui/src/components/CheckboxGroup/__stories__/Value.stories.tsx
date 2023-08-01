import type { StoryFn } from '@storybook/react'
import { CheckboxGroup } from '..'

export const Value: StoryFn<typeof CheckboxGroup> = args => (
  <CheckboxGroup {...args}>
    <CheckboxGroup.Checkbox name="radio-1" value="value-1">
      Radio 1
    </CheckboxGroup.Checkbox>
    <CheckboxGroup.Checkbox name="radio-2" value="value-2">
      Radio 2
    </CheckboxGroup.Checkbox>
  </CheckboxGroup>
)

Value.args = {
  name: 'template',
  label: 'Legend label',
}
