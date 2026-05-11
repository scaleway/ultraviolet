import type { Meta } from '@storybook/react-vite'
import { SubmitErrorAlert } from '../..'

export default {
  component: SubmitErrorAlert,
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
        component: 'This component is used to display error message after a form submission',
      },
    },
  },
  title: 'Form/Components/SubmitErrorAlert',
} as Meta

export { Playground } from './Playground.stories'
