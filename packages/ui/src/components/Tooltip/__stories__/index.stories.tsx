import type { Meta } from '@storybook/react-vite'
import { Tooltip } from '..'

export default {
  component: Tooltip,
  title: 'UI/Overlay/Tooltip',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: true,
      robust: false,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Placement } from './Placement.stories'
export { MaxWidth } from './MaxWidth.stories'
export { PlacementAuto } from './PlacementAuto.stories'
