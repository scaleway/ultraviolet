import { ExpandableCard } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof ExpandableCard> = ({ ...args }) => (
  <ExpandableCard {...args}>Content</ExpandableCard>
)

Template.args = {
  header: 'Title',
}
