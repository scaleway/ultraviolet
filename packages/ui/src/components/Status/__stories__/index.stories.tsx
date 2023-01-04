import type { Meta } from '@storybook/react'
import Status from '..'

export default {
  component: Status,
  parameters: {
    docs: {
      description: {
        component: 'Colorful circle that can be used to indicated state.',
      },
    },
  },
  title: 'Components/Feedback/Status',
} as Meta

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
export { Tooltip } from './Tooltip.stories'
export { Animated } from './Animated.stories'
