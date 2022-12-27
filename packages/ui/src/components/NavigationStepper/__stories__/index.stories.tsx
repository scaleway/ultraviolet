import type { ComponentMeta } from '@storybook/react'
import NavigationStepper, { Step } from '..'

export default {
  component: NavigationStepper,
  parameters: {
    docs: {
      description: {
        component: 'NavigationStepper display a navigation with steps',
      },
    },
  },
  subcomponents: { Step },
  title: 'Components/Navigation/NavigationStepper',
} as ComponentMeta<typeof NavigationStepper>

export { Playground } from './Playground.stories'
export { LongText } from './LongText.stories'
export { LoadingStep } from './LoadingStep.stories'
export { Controlled } from './Controlled.stories'
export { Condensed } from './Condensed.stories'
