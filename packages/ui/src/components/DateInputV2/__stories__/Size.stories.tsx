import type { StoryFn } from '@storybook/react'
import { DateInputV2 } from '..'
import { Stack } from '../../Stack'

export const Size: StoryFn<typeof DateInputV2> = args => (
  <Stack gap="2">
    {(['small', 'medium', 'large'] as const).map(size => (
      <DateInputV2 {...args} key={size} label={size} size={size} />
    ))}
  </Stack>
)
