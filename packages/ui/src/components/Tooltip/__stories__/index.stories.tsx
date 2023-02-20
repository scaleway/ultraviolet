import type { Meta } from '@storybook/react'
import { Tooltip } from '..'

export default {
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'A simple tooltip that will create dynamically a portal into the dom when children is hovered.',
      },
    },
  },
  title: 'Components/Overlay/Tooltip',
} as Meta

export { Playground } from './Playground.stories'
export { Placement } from './Placement.stories'
export { MaxWidth } from './MaxWidth.stories'
export { Nested } from './Nested.stories'
