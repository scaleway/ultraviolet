import type { StoryFn } from '@storybook/react-vite'
import { ExpandableCard } from '..'

export const Template: StoryFn<typeof ExpandableCard> = ({ ...args }) => (
  <ExpandableCard {...args}>Content</ExpandableCard>
)

Template.args = {
  header: 'Title',
}
