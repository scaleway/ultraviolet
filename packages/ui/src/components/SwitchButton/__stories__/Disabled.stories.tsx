import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SwitchButton } from '../index'

export const Disabled: StoryFn<ComponentProps<typeof SwitchButton>> = args => (
  <SwitchButton {...args} size="small">
    <SwitchButton.Option value="option1">Option 1</SwitchButton.Option>
    <SwitchButton.Option
      value="option2"
      disabled
      tooltip="This option is disabled"
    >
      Option Disabled
    </SwitchButton.Option>
    <SwitchButton.Option value="option3">Option 3</SwitchButton.Option>
    <SwitchButton.Option value="option4">Option 4</SwitchButton.Option>
  </SwitchButton>
)
Disabled.args = {
  value: 'option1',
}
Disabled.parameters = {
  docs: {
    description: {
      story:
        'You can use `disabled` on `SwitchButton.Option` to disable an option. In addition, you can use the `tooltip` prop to provide a message explaining why the option is disabled.',
    },
  },
}
