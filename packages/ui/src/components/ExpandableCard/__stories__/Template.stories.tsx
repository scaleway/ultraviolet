import type { StoryFn } from '@storybook/react'
import { ExpandableCard } from '..'

export const Template: StoryFn<typeof ExpandableCard> = ({ ...args }) => (
  <ExpandableCard {...args}>Content</ExpandableCard>
)

Template.args = {
  header: 'Title',
}
