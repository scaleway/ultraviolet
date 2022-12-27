import type { ComponentStory } from '@storybook/react'
import Notice from '..'

export const Template: ComponentStory<typeof Notice> = args => (
  <Notice {...args}>This is a notice</Notice>
)
