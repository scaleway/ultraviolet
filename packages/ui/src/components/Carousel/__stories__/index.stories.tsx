import type { Meta } from '@storybook/react'
import { Carousel, CarouselItem } from '..'

export default {
  component: Carousel,
  title: 'Components/Data Display/Carousel',
  subcomponents: { CarouselItem },
} as Meta<typeof Carousel>

export { Playground } from './Playground.stories'
