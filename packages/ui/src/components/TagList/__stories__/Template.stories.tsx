import { TagList } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof TagList> = args => <TagList {...args} />

Template.args = {
  popoverTitle: 'Additional',
}
