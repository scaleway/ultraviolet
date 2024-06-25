import type { StoryFn } from '@storybook/react'
import { Slider } from '..'

export const Double: StoryFn<typeof Slider> = args => <Slider {...args} />

Double.args = {
  value: [3, 50],
  step: 0.5,
  double: true,
  input: true,
  label: 'Label',
}

Double.parameters = {
  docs: {
    description: {
      story:
        'With prop `double = true`, it is possible to have a range slider. Prop `value` must be an array of numbers (for min and max value) instead of a number.',
    },
  },
}
