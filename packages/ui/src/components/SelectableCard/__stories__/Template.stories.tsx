import type { StoryFn } from '@storybook/react-vite'
import { Text } from '../../Text'
import { SelectableCard } from '..'

export const Template: StoryFn<typeof SelectableCard> = ({ ...props }) => (
  <SelectableCard {...props} />
)

Template.args = {
  label: 'Selectable Radio',
  children: (
    <Text as="p" variant="body" prominence="weak" sentiment="neutral">
      test
    </Text>
  ),
}
