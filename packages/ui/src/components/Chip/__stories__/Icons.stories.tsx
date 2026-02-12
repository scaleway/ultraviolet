import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Chip } from '..'
import { FilterIcon } from '@ultraviolet/icons/FilterIcon'
import { CloseIcon } from '@ultraviolet/icons/CloseIcon'

export const Icons: StoryFn<typeof Chip> = ({ ...args }) => (
  <Stack direction="row" gap={1}>
    <Chip {...args}>
      Trailing icon
      <Chip.Icon icon={<CloseIcon />} onClick={() => alert('Deleted')} />
    </Chip>
    <Chip {...args}>
      <Chip.Icon icon={<FilterIcon />} onClick={() => alert('Deleted')} />
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
