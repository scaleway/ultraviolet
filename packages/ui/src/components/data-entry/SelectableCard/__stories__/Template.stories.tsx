import type { StoryFn } from '@storybook/react-vite'
import { SelectableCard } from '..'
import { Text } from '../../../typography/Text'

export const Template: StoryFn<typeof SelectableCard> = ({ ...props }) => <SelectableCard {...props} />

Template.args = {
  children: (
    <Text as="p" prominence="weak" sentiment="neutral" variant="body">
      test
    </Text>
  ),
  label: 'Selectable Radio',
}
