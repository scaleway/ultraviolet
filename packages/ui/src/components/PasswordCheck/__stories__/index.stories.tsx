import { PasswordCheck } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: PasswordCheck,
  title: 'UI/Feedback/PasswordCheck',
  parameters: {
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta<typeof PasswordCheck>

export { Playground } from './Playground.stories'
