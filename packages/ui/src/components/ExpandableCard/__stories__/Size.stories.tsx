import type { StoryFn } from '@storybook/react-vite'
import { EXPANDABLE_CARD_SIZE, ExpandableCard } from '..'
import { Stack } from '../..'

export const Size: StoryFn<typeof ExpandableCard> = args => (
  <Stack gap={1}>
    {EXPANDABLE_CARD_SIZE.map(size => (
      <ExpandableCard key={size} {...args} size={size} header={size}>
        {size}
      </ExpandableCard>
    ))}
  </Stack>
)

Size.parameters = {
  docs: {
    description: {
      story: 'You can change the title size using the prop `size`.',
    },
  },
}
