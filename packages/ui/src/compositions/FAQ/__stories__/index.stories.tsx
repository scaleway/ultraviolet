import { FAQ } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: FAQ,
  title: 'Compositions/FAQ',
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
} satisfies Meta

export { Playground } from './Playground.stories'
