import type { StoryFn } from '@storybook/react'
import { Chip } from '..'
import { Stack } from '../../Stack'

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
