import type { StoryFn } from '@storybook/react-vite'
import { Slider } from '..'

export const Input: StoryFn<typeof Slider> = args => <Slider {...args} />

Input.args = {
  double: true,
  input: true,
  label: 'Label',
  max: 10,
  step: 0.5,
  value: [3, 5],
}

Input.parameters = {
  docs: {
    description: {
      story:
        'To allow the user to directly write the desired value, set prop `input` to `true`.',
    },
  },
}
