import type { StoryFn } from '@storybook/react-vite'
import { RadioGroup } from '..'

export const Template: StoryFn<typeof RadioGroup> = args => (
  <RadioGroup {...args}>
    <RadioGroup.Radio label="Radio 1" value="value-1" />
    <RadioGroup.Radio label="Radio 2" value="value-2" />
  </RadioGroup>
)

Template.args = {
  legend: 'Legend label',
  name: 'template',
}
