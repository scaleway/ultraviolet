import { Story } from '@storybook/react'
import Checkbox from '..'

export const Sizes: Story = _ => (
  <>
    <Checkbox size={16} onChange={() => {}}>
      Checkbox size 16
    </Checkbox>
    <Checkbox size={26} onChange={() => {}}>
      Checkbox size 26
    </Checkbox>
    <Checkbox size={32} onChange={() => {}}>
      Checkbox size 32
    </Checkbox>
  </>
)
Sizes.parameters = {
  docs: {
    storyDescription: 'Set size using `size` property.',
  },
}
