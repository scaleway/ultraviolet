import type { StoryFn } from '@storybook/react-vite'
import { SelectableCard } from '..'
import { Text } from '../../../Typography/Text'

export const Template: StoryFn<typeof SelectableCard> = ({ ...props }) => <SelectableCard {...props} />

Template.args = {
  children: (
    <Text as="p" prominence="weak" sentiment="neutral" variant="bodySmall">
      Description of the card
    </Text>
  ),
  label: 'Selectable Radio',
}
