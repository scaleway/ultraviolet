import type { ComponentStory } from '@storybook/react'
import { Pagination } from '..'

export const Template: ComponentStory<typeof Pagination> = args => (
  <Pagination {...args} />
)
