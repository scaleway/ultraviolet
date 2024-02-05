import type { StoryFn } from '@storybook/react'
import { DateInput } from '..'
import { Stack } from '../../Stack'

export const Size: StoryFn<typeof DateInput> = args => (
  <Stack gap="2">
    {(['small', 'medium', 'large'] as const).map(size => (
      <DateInput {...args} label={size} size={size} />
    ))}
  </Stack>
)
