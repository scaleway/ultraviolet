import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { SwitchButton } from '../index'

export const Template: Story<ComponentProps<typeof SwitchButton>> = args => (
  <SwitchButton {...args} />
)
