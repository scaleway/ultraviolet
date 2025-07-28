import type { StoryFn } from '@storybook/react-vite'
import { RadioGroup } from '..'

export const Template: StoryFn<typeof RadioGroup> = args => (
  <RadioGroup {...args}>
    <RadioGroup.Radio value="value-1" label="Radio 1" />
    <RadioGroup.Radio value="value-2" label="Radio 2" />
  </RadioGroup>
)

Template.args = {
  name: 'template',
  legend: 'Legend label',
}
