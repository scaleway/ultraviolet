import type { StoryFn } from '@storybook/react-vite'
import { SelectableCard } from '..'

export const Template: StoryFn<typeof SelectableCard> = ({ ...props }) => <SelectableCard {...props} />

Template.args = {
  children: 'Description of the card',
  label: 'Selectable Radio',
}
