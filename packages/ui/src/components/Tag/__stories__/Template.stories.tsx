import { Tag } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Tag> = args => <Tag {...args} />

Template.args = {
  children: 'Tag',
}
