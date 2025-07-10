import type { StoryFn } from '@storybook/react-vite'
import { Checkbox } from '..'

export const Checked: StoryFn = args => (
  <>
    <Checkbox {...args} checked onChange={() => {}}>
      Checked checkbox
    </Checkbox>
    <Checkbox
      {...args}
      checked="indeterminate"
      helper="Helper"
      onChange={() => {}}
    >
      Indeterminate checkbox
    </Checkbox>
  </>
)

Checked.parameters = {
  docs: {
    description: {
      story:
        'Checkbox can have two state `checked` or `indeterminate` defined by prop `checked`.',
    },
  },
}
