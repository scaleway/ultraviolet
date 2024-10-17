import type { StoryFn } from '@storybook/react'
import { Chip } from '..'
import { Stack } from '../../Stack'

export const Disabled: StoryFn<typeof Chip> = ({ ...args }) => (
  <Stack direction="row" gap={1}>
    <Chip {...args} disabled>
      Disabled inactive
      <Chip.Icon name="close" onClick={() => alert('Deleted')} />
    </Chip>
    <Chip {...args} disabled active>
      Disabled active
      <Chip.Icon name="close" onClick={() => alert('Deleted')} />
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
