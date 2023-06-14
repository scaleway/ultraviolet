import type { StoryFn } from '@storybook/react'
import { ProgressBar } from '..'

export const Progress: StoryFn = () => <ProgressBar progress />

Progress.parameters = {
  docs: {
    storyDescription:
      'Progress is used to show a loading state of the component.',
  },
}
