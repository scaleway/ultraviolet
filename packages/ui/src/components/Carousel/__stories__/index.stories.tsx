import { Carousel } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Carousel,
  title: 'UI/Data Display/Carousel',
  subcomponents: { 'Carousel.Item': Carousel.Item },
  parameters: {
    a11y: 'partial',
  },
} as Meta<typeof Carousel>

export { Playground } from './Playground.stories'
