import type { Meta } from '@storybook/react-vite'
import { Carousel } from '..'

export default {
  component: Carousel,
  subcomponents: { 'Carousel.Item': Carousel.Item },
  title: 'Components/Data Display/Carousel',
} as Meta<typeof Carousel>

export { Playground } from './Playground.stories'
