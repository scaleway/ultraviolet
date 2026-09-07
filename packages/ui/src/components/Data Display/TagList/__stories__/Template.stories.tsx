import type { StoryFn } from '@storybook/react-vite'
import { TagList } from '..'

export const Template: StoryFn<typeof TagList> = args => <TagList {...args} />

Template.args = {
  popoverTitle: 'Additional',
}
