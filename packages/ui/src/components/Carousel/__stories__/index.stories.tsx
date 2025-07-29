import type { Meta } from '@storybook/react-vite'
import { Carousel } from '..'

export default {
  component: Carousel,
  title: 'Components/Data Display/Carousel',
  subcomponents: { 'Carousel.Item': Carousel.Item },
} as Meta<typeof Carousel>

export { Playground } from './Playground.stories'
