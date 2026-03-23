import { Checkbox } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Value: StoryFn = args => (
  <>
    <Checkbox {...args} helper="Helper" onChange={() => {}} value="false">
      Checkbox value false
    </Checkbox>
    <Checkbox {...args} helper="Helper" onChange={() => {}} value="true">
      Checkbox value true
    </Checkbox>
    <Checkbox {...args} helper="Helper" onChange={() => {}} value={1234}>
      Checkbox value 1234
    </Checkbox>
  </>
)

Value.parameters = {
  docs: {
    description: { story: 'Set value using `value` property.' },
  },
}
