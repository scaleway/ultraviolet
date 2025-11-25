import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Slider } from '..'

export const Double: StoryFn<typeof Slider> = () => {
  const [value, setValue] = useState<number[]>([1, 3])

  return (
    <Slider
      data-testid="slider"
      double
      input
      name="slider"
      onChange={setValue}
      value={value}
    />
  )
}

Double.args = {
  double: true,
  input: true,
  label: 'Label',
  step: 0.5,
  value: [1, 3],
}

Double.parameters = {
  docs: {
    description: {
      story:
        'With prop `double = true`, it is possible to have a range slider. Prop `value` must be an array of numbers (for min and max value) instead of a number.',
    },
  },
}
