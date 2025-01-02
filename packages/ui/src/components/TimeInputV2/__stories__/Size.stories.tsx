import type { StoryFn } from '@storybook/react'
import { TimeInputV2 } from '..'
import { Stack } from '../../Stack'

export const Size: StoryFn<typeof TimeInputV2> = args => (
  <Stack gap="2">
    <TimeInputV2 {...args} label="small" size="small" />
    <TimeInputV2 {...args} label="medium" size="medium" />
    <TimeInputV2 {...args} label="large" size="large" />
  </Stack>
)
