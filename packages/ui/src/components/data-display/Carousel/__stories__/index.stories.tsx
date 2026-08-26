import type { Meta } from '@storybook/react-vite'
import { Carousel } from '..'

export default {
  component: Carousel,
  title: 'UI/Data Display/Carousel',
  subcomponents: { 'Carousel.Item': Carousel.Item },
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta<typeof Carousel>

export { Playground } from './Playground.stories'
