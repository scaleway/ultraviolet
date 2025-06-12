import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { SwitchButton } from '../index'

export const Options: StoryFn<ComponentProps<typeof SwitchButton>> = args => (
  <SwitchButton {...args} size="small">
    <SwitchButton.Option value="option1">Option 1</SwitchButton.Option>
    <SwitchButton.Option value="option2">Option 2</SwitchButton.Option>
    <SwitchButton.Option value="option3">Option 3</SwitchButton.Option>
    <SwitchButton.Option value="option4">Option 4</SwitchButton.Option>
  </SwitchButton>
)
Options.args = {
  value: 'option1',
}
Options.parameters = {
  docs: {
    description: {
      story: 'There is no limit to the number of options.',
    },
  },
}
