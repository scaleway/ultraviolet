import type { StoryFn } from '@storybook/react-vite'
import { CheckboxGroup } from '..'

export const Template: StoryFn<typeof CheckboxGroup> = args => (
  <CheckboxGroup {...args}>
    <CheckboxGroup.Checkbox
      name="termsAndConditions"
      value="termsAndConditions"
    >
      Accept terms and conditions
    </CheckboxGroup.Checkbox>
    <CheckboxGroup.Checkbox name="newsletter" tooltip="keke" value="newsletter">
      Accept to receive newsletter
    </CheckboxGroup.Checkbox>
  </CheckboxGroup>
)

Template.args = {
  legend: 'Conditions:',
  name: 'conditions',
  value: ['termsAndConditions'],
}
