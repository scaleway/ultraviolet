import type { StoryFn } from '@storybook/react-vite'
import { Radio } from '..'

export const Template: StoryFn<typeof Radio> = args => <Radio {...args} />

Template.args = {
  disabled: false,
  label: 'Label 1',
  name: 'basic',
  value: 'label-1',
}
