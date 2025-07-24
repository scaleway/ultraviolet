import type { StoryFn } from '@storybook/react-vite'
import { Pagination } from '..'

export const Template: StoryFn<typeof Pagination> = args => (
  <Pagination {...args} />
)
