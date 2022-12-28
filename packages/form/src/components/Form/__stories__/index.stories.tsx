import type { Meta } from '@storybook/react'
import { Form } from '../..'

export default {
  component: Form,
  parameters: {
    docs: {
      description: {
        component:
          'This is the main component that is needed to wrap your fields',
      },
    },
  },
  title: 'Form/Components/Form',
} as Meta

export { Playground } from './Playground.stories'
