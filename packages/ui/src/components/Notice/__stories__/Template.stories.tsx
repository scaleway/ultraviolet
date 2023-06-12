import type { StoryFn } from '@storybook/react'
import { Notice } from '..'

export const Template: StoryFn<typeof Notice> = args => (
  <Notice {...args}>This is a notice</Notice>
)
