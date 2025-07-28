import type { StoryFn } from '@storybook/react-vite'
import { Slider } from '..'

export const Input: StoryFn<typeof Slider> = args => <Slider {...args} />

Input.args = {
  value: [3, 5],
  step: 0.5,
  input: true,
  max: 10,
  double: true,
  label: 'Label',
}

Input.parameters = {
  docs: {
    description: {
      story:
        'To allow the user to directly write the desired value, set prop `input` to `true`.',
    },
  },
}
