import type { StoryFn } from '@storybook/react'
import { SelectableCard } from '..'

export const Template: StoryFn<typeof SelectableCard> = ({ ...props }) => (
  <SelectableCard {...props} />
)

Template.args = {
  label: 'Selectable Radio',
  children: 'test',
}
