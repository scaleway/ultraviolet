import type { Meta } from '@storybook/react'
import { Skeleton } from '..'

export default {
  component: Skeleton,
  decorators: [StoryComponent => <StoryComponent />],
  title: 'Components/Feedback/Skeleton',
} as Meta<typeof Skeleton>

export { Playground } from './Playground.stories'
export { Block } from './Block.stories'
export { Blocks } from './Blocks.stories'
export { Box } from './Box.stories'
export { Donut } from './Donut.stories'
export { Line } from './Line.stories'
export { Slider } from './Slider.stories'
export { List } from './List.stories'
