import { Carousel } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Carousel,
  title: 'UI/Data Display/Carousel',
  subcomponents: { 'Carousel.Item': Carousel.Item },
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
} as Meta<typeof Carousel>

export { Playground } from './Playground.stories'
