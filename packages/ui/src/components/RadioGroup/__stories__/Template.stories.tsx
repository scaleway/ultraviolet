import type { StoryFn } from '@storybook/react'
import { RadioGroup } from '..'

export const Template: StoryFn<typeof RadioGroup> = args => (
  <RadioGroup {...args}>
    <RadioGroup.Radio name="value-1" value="value-1" label="Radio 1" />
    <RadioGroup.Radio name="value-2" value="value-2" label="Radio 2" />
  </RadioGroup>
)

Template.args = {
  name: 'template',
  label: 'Legend label',
}
