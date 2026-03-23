import { PasswordCheck } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof PasswordCheck> = args => (
  <PasswordCheck {...args}>Button</PasswordCheck>
)
