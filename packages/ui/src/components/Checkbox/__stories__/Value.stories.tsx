import type { StoryFn } from '@storybook/react-vite'
import { Checkbox } from '..'

export const Value: StoryFn = args => (
  <>
    <Checkbox {...args} value="false" helper="Helper" onChange={() => {}}>
      Checkbox value false
    </Checkbox>
    <Checkbox {...args} value="true" helper="Helper" onChange={() => {}}>
      Checkbox value true
    </Checkbox>
    <Checkbox {...args} value={1234} helper="Helper" onChange={() => {}}>
      Checkbox value 1234
    </Checkbox>
  </>
)

Value.parameters = {
  docs: {
    description: { story: 'Set value using `value` property.' },
  },
}
