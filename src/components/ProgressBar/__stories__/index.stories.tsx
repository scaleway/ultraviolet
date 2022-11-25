import { ComponentMeta } from '@storybook/react'
import ProgressBar from '..'

export default {
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: 'An horizontal progress bar.',
      },
    },
  },
  title: 'Components/Data Display/ProgressBar',
} as ComponentMeta<typeof ProgressBar>

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
export { Progress } from './Progress.stories'
export { Cap } from './Cap.stories'
