import { Notice } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Notice> = args => (
  <Notice {...args}>This is a notice</Notice>
)
