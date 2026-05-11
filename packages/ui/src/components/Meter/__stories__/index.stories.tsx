import { Meter } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Meter,
  title: 'UI/Feedback/Meter',
  parameters: {
    a11yStatus: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta<typeof Meter>

export { Playground } from './Playground.stories'
