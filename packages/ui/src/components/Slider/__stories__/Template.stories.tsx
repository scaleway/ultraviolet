import type { StoryFn } from '@storybook/react'
import { Slider } from '..'

export const Template: StoryFn<typeof Slider> = args => <Slider {...args} />

Template.args = {
  value: 30,
  step: 1,
  min: -1,
  max: 10,
  label: 'Label',
  name: 'Slider',
}
