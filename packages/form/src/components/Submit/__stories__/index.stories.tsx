import { Submit } from '../..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Submit,
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
        component: 'Default submit button when no one is provided',
      },
    },
  },
  title: 'Form/Components/Submit',
} as Meta

export { Playground } from './Playground.stories'
export { Invalid } from './Invalid.stories'
export { Submitting } from './Submitting.stories'
