import type { StoryFn } from '@storybook/react-vite'
import { Tag } from '..'

export const Template: StoryFn<typeof Tag> = args => <Tag {...args} />

Template.args = {
  children: 'Tag',
}
