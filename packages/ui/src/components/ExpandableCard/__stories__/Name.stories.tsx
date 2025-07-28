import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../..'
import { ExpandableCard } from '..'

export const Name: StoryFn<typeof ExpandableCard> = args => (
  <Stack gap={1}>
    {['Pool-1', 'Pool-2', 'Pool-3'].map(name => (
      <ExpandableCard key={name} {...args} name="pool" header={name}>
        Content for {name}
      </ExpandableCard>
    ))}
  </Stack>
)

Name.parameters = {
  docs: {
    description: {
      story:
        'Since this component is based on `details` marker, you can provide a prop `name` to group multiple ExpandableCard in the same group. Only one card of a group can be open at the same time.',
    },
  },
}
