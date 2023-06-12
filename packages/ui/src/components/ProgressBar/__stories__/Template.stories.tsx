import type { StoryFn } from '@storybook/react'
import { ProgressBar } from '..'

export const Template: StoryFn<typeof ProgressBar> = args => (
  <ProgressBar value={40} {...args} />
)
