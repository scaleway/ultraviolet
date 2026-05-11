import type { Meta } from '@storybook/react-vite'
import { CustomerSatisfaction } from '..'

export default {
  component: CustomerSatisfaction,
  title: 'Compositions/CustomerSatisfaction',
  parameters: {
    a11yStatus: 'partial',
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
