import { Banner } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Banner,
  title: 'UI/Other/Banner',
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
} as Meta<typeof Banner>

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
export { Sizes } from './Sizes.stories'
export { Directions } from './Directions.stories'
