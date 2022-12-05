import { ComponentMeta } from '@storybook/react'
import StateBar, { StateBarBar, StateBarState } from '..'

export default {
  component: StateBar,
  parameters: {
    docs: {
      description: {
        component: 'A description of a progress bar.',
      },
    },
  },
  title: 'Components/Data Display/StateBar',
  subcomponents: { StateBarBar, StateBarState },
} as ComponentMeta<typeof StateBar>

export { Playground } from './Playground.stories'
export { Unlimited } from './Unlimited.stories'
export { Progress } from './Progress.stories'
export { LabelValue } from './LabelValue.stories'
