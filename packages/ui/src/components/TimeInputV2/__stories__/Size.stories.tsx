import type { StoryFn } from '@storybook/react'
import { TimeInputV2 } from '..'
import { Stack } from '../../Stack'

export const Size: StoryFn<typeof TimeInputV2> = () => (
  <Stack gap="2">
    <TimeInputV2 label="small" size="small" />
    <TimeInputV2 label="medium" size="medium" />
    <TimeInputV2 label="large" size="large" />
  </Stack>
)
