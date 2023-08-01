import type { StoryFn } from '@storybook/react'
import { Radio } from '..'

export const Helper: StoryFn = () => (
  <Radio
    name="helper-label-1"
    helper="Helper content"
    value="helper-label-1"
    onChange={() => {}}
    label="Label 1"
  />
)

Helper.parameters = {
  docs: {
    storyDescription: 'Add an helper text using `helper` property.',
  },
}
