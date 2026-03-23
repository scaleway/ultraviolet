import { Pagination } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Pagination> = args => (
  <Pagination {...args} />
)
