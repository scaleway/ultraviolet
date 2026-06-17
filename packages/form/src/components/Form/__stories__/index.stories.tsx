import type { Meta } from '@storybook/react-vite'
import { Form } from '../..'

export default {
  component: Form,
  parameters: {
    a11y: false,
    docs: {
      description: {
        component: 'This is the main component that is needed to wrap your fields',
      },
    },
  },
  title: 'Form/Components/Form',
} as Meta

export { Playground } from './Playground.stories'
