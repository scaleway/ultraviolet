import type { Meta } from '@storybook/react-vite'
import { Skeleton } from '..'

export default {
  component: Skeleton,
  title: 'UI/Feedback/Skeleton',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta<typeof Skeleton>

export { Playground } from './Playground.stories'
export { Block } from './Block.stories'
export { Blocks } from './Blocks.stories'
export { Box } from './Box.stories'
export { Donut } from './Donut.stories'
export { Line } from './Line.stories'
export { Square } from './Square.stories'
export { Slider } from './Slider.stories'
export { List } from './List.stories'
