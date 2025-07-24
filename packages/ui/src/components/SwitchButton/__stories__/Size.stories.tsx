import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { SwitchButton } from '../index'

export const Size: StoryFn<ComponentProps<typeof SwitchButton>> = args => (
  <Stack gap={1}>
    Small (default size):
    <SwitchButton {...args}>
      <SwitchButton.Option value="option1">Option 1</SwitchButton.Option>
      <SwitchButton.Option value="option2">Option 2</SwitchButton.Option>
    </SwitchButton>
    Medium:
    <SwitchButton {...args} size="medium">
      <SwitchButton.Option value="option1">Option 1</SwitchButton.Option>
      <SwitchButton.Option value="option2">Option 2</SwitchButton.Option>
    </SwitchButton>
  </Stack>
)

Size.args = {
  value: 'option1',
}
