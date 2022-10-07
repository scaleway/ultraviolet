import { ComponentStory } from '@storybook/react'
import SelectableCard from '..'

export const Template: ComponentStory<typeof SelectableCard> = ({
  ...props
}) => <SelectableCard {...props} />

Template.args = {
  label: 'Selectable Radio',
}
