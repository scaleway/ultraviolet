import type { ComponentStory } from '@storybook/react'
import PasswordCheck from '..'

export const Template: ComponentStory<typeof PasswordCheck> = args => (
  <PasswordCheck {...args}>Button</PasswordCheck>
)
