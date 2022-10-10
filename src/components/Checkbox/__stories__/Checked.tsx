import { Story } from '@storybook/react'
import Checkbox from '..'

export const Checked: Story = _ => (
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
