import type { StoryFn } from '@storybook/react'
import { Tag } from '..'

export const Template: StoryFn<typeof Tag> = args => <Tag {...args} />

Template.args = {
  children: 'Tag',
}
