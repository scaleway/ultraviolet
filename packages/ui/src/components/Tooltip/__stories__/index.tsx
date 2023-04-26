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

export { Playground } from './Playground'
export { Placement } from './Placement'
export { MaxWidth } from './MaxWidth'
