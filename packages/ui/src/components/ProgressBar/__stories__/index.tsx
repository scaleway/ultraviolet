import type { ComponentMeta } from '@storybook/react'
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
} as ComponentMeta<typeof ProgressBar>

export { Playground } from './Playground'
export { Variants } from './Variants'
export { Progress } from './Progress'
export { Cap } from './Cap'
