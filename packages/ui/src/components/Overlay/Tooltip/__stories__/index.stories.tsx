import type { Meta } from '@storybook/react-vite'
import { Tooltip } from '..'

export default {
  component: Tooltip,
  title: 'UI/Overlay/Tooltip',
  parameters: {
    a11yStatus: {
      perceivable: true,
      operable: true,
      understandable: true,
      robust: true,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Placement } from './Placement.stories'
export { MaxWidth } from './MaxWidth.stories'
export { Portal } from './Portal.stories'
export { Delay } from './Delay.stories'
export { Examples } from './Examples.stories'
