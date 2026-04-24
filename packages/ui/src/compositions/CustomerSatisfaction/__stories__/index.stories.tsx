import { CustomerSatisfaction } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: CustomerSatisfaction,
  title: 'Compositions/CustomerSatisfaction',
  parameters: {
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
    experimental: true,
  },
} as Meta

export { Playground } from './Playground.stories'
