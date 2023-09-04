import type { StoryFn } from '@storybook/react'
import { Checkbox } from '..'

export const Value: StoryFn = args => (
  <>
    <Checkbox {...args} value="false" onChange={() => {}}>
      Checkbox value false
    </Checkbox>
    <Checkbox {...args} value="true" onChange={() => {}}>
      Checkbox value true
    </Checkbox>
    <Checkbox {...args} value={1234} onChange={() => {}}>
      Checkbox value 1234
    </Checkbox>
  </>
)

Value.parameters = {
  docs: {
    storyDescription: 'Set value using `value` property.',
  },
}
