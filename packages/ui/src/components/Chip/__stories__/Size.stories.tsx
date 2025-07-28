import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Chip } from '..'

export const Size: StoryFn<typeof Chip> = ({ ...args }) => (
  <Stack direction="row" gap={1}>
    <Chip {...args} size="medium">
      Medium (default)
    </Chip>
    <Chip {...args} size="large">
      Large
    </Chip>
  </Stack>
)
