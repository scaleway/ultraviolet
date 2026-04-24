import { Skeleton } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Skeleton,
  title: 'UI/Feedback/Skeleton',
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
