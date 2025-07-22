import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SwitchButton } from '../index'

export const Template: StoryFn<ComponentProps<typeof SwitchButton>> = args => (
  <SwitchButton {...args} value="option1">
    <SwitchButton.Option value="option1">Option 1</SwitchButton.Option>
    <SwitchButton.Option value="option2">Option 2</SwitchButton.Option>
  </SwitchButton>
)
