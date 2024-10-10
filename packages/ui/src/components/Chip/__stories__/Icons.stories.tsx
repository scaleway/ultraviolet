import type { StoryFn } from '@storybook/react'
import { Chip } from '..'
import { Stack } from '../../Stack'

export const Icons: StoryFn<typeof Chip> = ({ ...args }) => (
  <Stack direction="row" gap={1}>
    <Chip {...args}>
      Trailing icon
      <Chip.Icon
        name="close"
        type="trailing"
        onClick={() => alert('Deleted')}
      />
    </Chip>
    <Chip {...args}>
      <Chip.Icon name="filter" type="leading" />
      Leading icon
    </Chip>
  </Stack>
)
Icons.parameters = {
  docs: {
    description: {
      story:
        'To add an icon on the chip, use `Chip.Icon` inside the children of `Chip`.',
    },
  },
}
