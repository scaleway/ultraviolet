import type { ComponentMeta } from '@storybook/react'
import { StateBar, StateBarBar, StateBarState } from '..'

export default {
  component: StateBar,
  parameters: {
    docs: {
      description: {
        component: 'A description of a progress bar.',
      },
    },
  },
  title: 'Components/Feedback/StateBar',
  subcomponents: { StateBarBar, StateBarState },
} as ComponentMeta<typeof StateBar>

export { LabelValue } from './LabelValue.stories'
export { Playground } from './Playground.stories'
export { Progress } from './Progress.stories'
export { Unlimited } from './Unlimited.stories'
