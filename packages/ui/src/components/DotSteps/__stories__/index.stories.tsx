import { Meta } from '@storybook/react'
import DotSteps from '..'

export default {
  component: DotSteps,
  parameters: {
    docs: {
      description: {
        component: 'Dot Steps control, to switch between pages/steps.',
      },
    },
  },
  title: 'Components/Navigation/DotSteps',
} as Meta

export { Playground } from './Playground.stories'
