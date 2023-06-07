import type { Meta } from '@storybook/react'
import { ProgressBar } from '..'

export default {
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: 'An horizontal progress bar.',
      },
    },
  },
  title: 'Components/Feedback/ProgressBar',
} as Meta<typeof ProgressBar>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Progress } from './Progress.stories'
export { Cap } from './Cap.stories'
