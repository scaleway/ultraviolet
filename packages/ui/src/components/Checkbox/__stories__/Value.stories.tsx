import type { StoryFn } from '@storybook/react'
import { Checkbox } from '..'

export const Value: StoryFn = () => (
  <>
    <Checkbox value="false" helper="Helper" onChange={() => {}}>
      Checkbox value false
    </Checkbox>
    <Checkbox value="true" helper="Helper" onChange={() => {}}>
      Checkbox value true
    </Checkbox>
    <Checkbox value={1234} helper="Helper" onChange={() => {}}>
      Checkbox value 1234
    </Checkbox>
  </>
)

Value.parameters = {
  docs: {
    storyDescription: 'Set value using `value` property.',
  },
}
