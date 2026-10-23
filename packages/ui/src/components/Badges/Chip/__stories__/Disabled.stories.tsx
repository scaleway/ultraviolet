import type { StoryFn } from '@storybook/react-vite'
import { Chip } from '..'
import { Stack } from '../../../Layout/Stack'

export const Disabled: StoryFn<typeof Chip> = ({ ...args }) => (
  <Stack direction="row" gap={1}>
    <Chip
      {...args}
      disabled
      onClose={() => {
        /* empty */
      }}
    >
      Disabled inactive
    </Chip>
    <Chip
      {...args}
      active
      disabled
      onClose={() => {
        /* empty */
      }}
    >
      Disabled active
    </Chip>
  </Stack>
)
Disabled.parameters = {
  docs: {
    description: {
      story: 'A disabled chip can be active or not',
    },
  },
}
