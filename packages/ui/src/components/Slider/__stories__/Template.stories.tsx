import { Slider } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Slider> = args => <Slider {...args} />

Template.args = {
  label: 'Label',
  max: 10,
  min: 0,
  name: 'Slider',
  step: 1,
  value: 3,
}
