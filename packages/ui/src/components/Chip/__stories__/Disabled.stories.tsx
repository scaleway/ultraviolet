import { CloseIcon } from '@ultraviolet/icons/CloseIcon'

import { Chip } from '..'
import { Stack } from '../../Stack'

import type { StoryFn } from '@storybook/react-vite'

export const Disabled: StoryFn<typeof Chip> = ({ ...args }) => (
  <Stack direction="row" gap={1}>
    <Chip {...args} disabled>
      Disabled inactive
      <Chip.Icon icon={<CloseIcon />} onClick={() => alert('Deleted')} />
    </Chip>
    <Chip {...args} active disabled>
      Disabled active
      <Chip.Icon icon={<CloseIcon />} onClick={() => alert('Deleted')} />
    </Chip>
  </Stack>
)
Disabled.parameters = {
  docs: {
    description: {
      story:
        'A disabled chip can be active or not. OnClick inside a `Chip.Icon` is deactivated if the chip is disabled',
    },
  },
}
