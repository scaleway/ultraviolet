import { Form } from '../..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Form,
  parameters: {
    a11y: false,
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
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
