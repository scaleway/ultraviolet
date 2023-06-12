import type { StoryFn } from '@storybook/react'
import { PasswordCheck } from '..'

export const Template: StoryFn<typeof PasswordCheck> = args => (
  <PasswordCheck {...args}>Button</PasswordCheck>
)
