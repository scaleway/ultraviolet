import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { SwitchButton } from '../index'

export const Template: StoryFn<ComponentProps<typeof SwitchButton>> = args => (
  <SwitchButton {...args} />
)
