import type { StoryFn } from '@storybook/react'
import { Radio } from '..'

export const Template: StoryFn<typeof Radio> = args => <Radio {...args} />

Template.args = {
  // checked: false,
  label: 'Label 1',
  disabled: false,
  name: 'basic',
  value: 'label-1',
}
