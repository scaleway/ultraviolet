import type { Meta } from '@storybook/react'
import ToastContainer from '..'

export default {
  component: ToastContainer,
  parameters: {
    docs: {
      description: {
        component:
          'Display short information about an event that happen in the interface in a floating alert.',
      },
    },
  },
  title: 'Components/Feedback/Toaster',
} as Meta

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
