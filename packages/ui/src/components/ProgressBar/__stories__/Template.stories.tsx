import { ProgressBar } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof ProgressBar> = args => (
  <ProgressBar value={40} {...args} />
)
