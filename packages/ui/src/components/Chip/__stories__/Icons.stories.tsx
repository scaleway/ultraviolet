import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Chip } from '..'

export const Icons: StoryFn<typeof Chip> = ({ ...args }) => (
  <Stack direction="row" gap={1}>
    <Chip {...args}>
      Trailing icon
      <Chip.Icon name="close" onClick={() => alert('Deleted')} />
    </Chip>
    <Chip {...args}>
      <Chip.Icon name="filter" />
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
