import type { Meta } from '@storybook/react-vite'
import { ProgressBar } from '..'

export default {
  component: ProgressBar,
  title: 'UI/Feedback/ProgressBar',
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
  },
} as Meta<typeof ProgressBar>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Progress } from './Progress.stories'
export { Cap } from './Cap.stories'
export { Label } from './Label.stories'
export { Direction } from './Direction.stories'
export { ShowProgress } from './ShowProgress.stories'
export { PrefixSuffix } from './PrefixSuffix.stories'
export { Max } from './Max.stories'
export { Overflow } from './Overflow.stories'
