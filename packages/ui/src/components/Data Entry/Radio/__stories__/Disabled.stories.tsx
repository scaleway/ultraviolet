import type { StoryFn } from '@storybook/react-vite'
import { Radio } from '..'

export const Disabled: StoryFn = args => (
  <>
    <Radio value="1" label="Radio disabled" {...args} disabled onChange={() => {}} />
    <Radio value="2" label="Radio disabled and in error" {...args} disabled error onChange={() => {}} />
    <Radio value="3" label="Radio checked and disabled" {...args} checked disabled onChange={() => {}} />
    <Radio
      value="4"
      label="Radio checked, disabled and in error"
      {...args}
      checked
      disabled
      error
      onChange={() => {}}
    />
  </>
)

Disabled.parameters = {
  docs: {
    description: { story: 'Set activation using `disabled` property.' },
  },
}
