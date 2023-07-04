import type { Meta } from '@storybook/react'
import { Meter } from '..'

export default {
  component: Meter,
  parameters: {
    docs: {
      description: {
        component: 'Show strength of a password based on different criteria.',
      },
    },
  },
  title: 'Components/Feedback/Meter',
} as Meta<typeof Meter>

export { Playground } from './Playground.stories'
