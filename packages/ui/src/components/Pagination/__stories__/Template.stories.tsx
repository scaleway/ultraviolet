import type { StoryFn } from '@storybook/react'
import { Pagination } from '..'

export const Template: StoryFn<typeof Pagination> = args => (
  <Pagination {...args} />
)
