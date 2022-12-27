import type { ComponentMeta } from '@storybook/react'
import Slider, { SliderItem } from '..'

export default {
  component: Slider,
  parameters: {
    docs: {
      description: {
        component:
          'Display an horizontal scroll bar with multiple boxed children inside of it.',
      },
    },
  },
  title: 'Components/Data Display/Slider',
  subcomponents: { SliderItem },
} as ComponentMeta<typeof Slider>

export { Playground } from './Playground.stories'
