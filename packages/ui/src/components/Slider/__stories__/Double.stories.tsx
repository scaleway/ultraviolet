import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Slider } from '..'

export const Double: StoryFn<typeof Slider> = () => {
  const [value, setValue] = useState<number[]>([1, 2])

  return (
    <Slider
      name="slider"
      onChange={setValue}
      data-testid="slider"
      value={value}
      double
      input
    />
  )
}

Double.args = {
  value: [1, 2],
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
