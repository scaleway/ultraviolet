import type { ComponentStory } from '@storybook/react'
import Radio from '..'

export const Template: ComponentStory<typeof Radio> = args => (
  <Radio {...args} />
)

Template.args = {
  checked: false,
  children: 'Label 1',
  disabled: false,
  name: 'basic',
  value: 'label-1',
}
