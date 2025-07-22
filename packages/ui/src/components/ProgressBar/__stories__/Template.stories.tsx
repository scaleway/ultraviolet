import type { StoryFn } from '@storybook/react-vite'
import { ProgressBar } from '..'

export const Template: StoryFn<typeof ProgressBar> = args => (
  <ProgressBar value={40} {...args} />
)
