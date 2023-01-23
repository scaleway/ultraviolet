import type { ComponentMeta } from '@storybook/react'
import { Carousel, CarouselItem } from '..'

export default {
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component:
          'Display an horizontal scroll bar with multiple boxed children inside of it.',
      },
    },
  },
  title: 'Components/Data Display/Carousel',
  subcomponents: { CarouselItem },
} as ComponentMeta<typeof Carousel>

export { Playground } from './Playground.stories'
