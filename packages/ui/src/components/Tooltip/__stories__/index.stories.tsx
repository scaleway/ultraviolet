import { Tooltip } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Tooltip,
  title: 'UI/Overlay/Tooltip',
  parameters: {
    a11y: 'partial',
  },
} as Meta

export { Playground } from './Playground.stories'
export { Placement } from './Placement.stories'
export { MaxWidth } from './MaxWidth.stories'
