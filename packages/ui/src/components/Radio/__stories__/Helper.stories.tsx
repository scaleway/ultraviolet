import type { StoryFn } from '@storybook/react-vite'
import { Radio } from '..'

export const Helper: StoryFn = args => (
  <Radio
    {...args}
    helper="Helper content"
    label="Label 1"
    name="helper-label-1"
    onChange={() => {}}
    value="helper-label-1"
  />
)

Helper.parameters = {
  docs: {
    description: { story: 'Add an helper text using `helper` property.' },
  },
}
