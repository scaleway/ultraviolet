import type { StoryFn } from '@storybook/react-vite'
import { Slider } from '..'

export const Template: StoryFn<typeof Slider> = args => <Slider {...args} />

Template.args = {
  value: 3,
  step: 1,
  min: 0,
  max: 10,
  label: 'Label',
  name: 'Slider',
}
