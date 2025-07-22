import type { StoryFn } from '@storybook/react-vite'
import { Radio } from '..'

export const Template: StoryFn<typeof Radio> = args => <Radio {...args} />

Template.args = {
  label: 'Label 1',
  disabled: false,
  name: 'basic',
  value: 'label-1',
}
