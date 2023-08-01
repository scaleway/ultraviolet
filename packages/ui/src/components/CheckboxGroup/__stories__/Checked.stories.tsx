import type { StoryFn } from '@storybook/react'
import { Checkbox } from '..'

export const Checked: StoryFn = () => (
  <>
    <Checkbox checked onChange={() => {}}>
      Checked checkbox
    </Checkbox>
    <Checkbox checked="indeterminate" onChange={() => {}}>
      Indeterminate checkbox
    </Checkbox>
  </>
)

Checked.parameters = {
  docs: {
    storyDescription:
      'Checkbox can have two state `checked` or `indeterminate` defined by prop `checked`.',
  },
}
