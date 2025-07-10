import type { StoryFn } from '@storybook/react-vite'
import { Radio } from '..'

export const Helper: StoryFn = args => (
  <Radio
    {...args}
    name="helper-label-1"
    helper="Helper content"
    value="helper-label-1"
    onChange={() => {}}
    label="Label 1"
  />
)

Helper.parameters = {
  docs: {
    description: { story: 'Add an helper text using `helper` property.' },
  },
}
