import { Story } from '@storybook/react'
import Checkbox from '..'

export const Value: Story = () => (
  <>
    <Checkbox value="false" onChange={() => {}}>
      Checkbox value false
    </Checkbox>
    <Checkbox value="true" onChange={() => {}}>
      Checkbox value true
    </Checkbox>
    <Checkbox value={1234} onChange={() => {}}>
      Checkbox value 1234
    </Checkbox>
  </>
)

Value.parameters = {
  docs: {
    storyDescription: 'Set value using `value` property.',
  },
}
