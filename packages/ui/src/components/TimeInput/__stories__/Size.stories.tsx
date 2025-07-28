import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { TimeInput } from '..'

export const Size: StoryFn<typeof TimeInput> = () => (
  <Stack gap="2">
    <TimeInput label="small" size="small" />
    <TimeInput label="medium" size="medium" />
    <TimeInput label="large" size="large" />
  </Stack>
)
