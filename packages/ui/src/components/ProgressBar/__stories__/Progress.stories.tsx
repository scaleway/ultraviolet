import type { Story } from '@storybook/react'
import { ProgressBar } from '..'

export const Progress: Story = () => <ProgressBar progress />

Progress.parameters = {
  docs: {
    storyDescription:
      'Progress is used to show a loading state of the component.',
  },
}
