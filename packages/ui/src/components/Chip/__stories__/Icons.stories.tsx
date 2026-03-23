import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import { FilterIcon } from '@ultraviolet/icons/FilterIcon'

import { Chip } from '..'
import { Stack } from '../../Stack'

import type { StoryFn } from '@storybook/react-vite'

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
