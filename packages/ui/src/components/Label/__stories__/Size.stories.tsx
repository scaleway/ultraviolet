import { Label } from '..'
import { Stack } from '../../Stack'

import type { StoryFn } from '@storybook/react-vite'

export const Size: StoryFn<typeof Label> = () => (
  <Stack>
    <Label size="large">I am large</Label>
    <Label size="medium">I am medium or small</Label>
  </Stack>
)
