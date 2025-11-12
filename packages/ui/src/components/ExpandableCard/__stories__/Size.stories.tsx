import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../..'
import { EXPANDABLE_CARD_SIZE, ExpandableCard } from '..'

export const Size: StoryFn<typeof ExpandableCard> = args => (
  <Stack gap={1}>
    {EXPANDABLE_CARD_SIZE.map(size => (
      <ExpandableCard key={size} {...args} header={size} size={size}>
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
