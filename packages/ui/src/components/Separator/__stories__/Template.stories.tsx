import { Separator } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Separator> = args => (
  <Separator {...args} />
)
