import { Radio } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Radio> = args => <Radio {...args} />

Template.args = {
  disabled: false,
  label: 'Label 1',
  name: 'basic',
  value: 'label-1',
}
