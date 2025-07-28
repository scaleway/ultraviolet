import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Label } from '..'

export const Size: StoryFn<typeof Label> = () => (
  <Stack>
    <Label size="large">I am large</Label>
    <Label size="medium">I am medium or small</Label>
  </Stack>
)
