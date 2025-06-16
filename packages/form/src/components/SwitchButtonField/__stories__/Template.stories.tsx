import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { SwitchButtonField } from '..'

export const Template: StoryFn<
  ComponentProps<typeof SwitchButtonField>
> = args => (
  <SwitchButtonField {...args}>
    <SwitchButtonField.Option value="left">Left</SwitchButtonField.Option>
    <SwitchButtonField.Option value="center">Center</SwitchButtonField.Option>
    <SwitchButtonField.Option value="right">Right</SwitchButtonField.Option>
  </SwitchButtonField>
)
