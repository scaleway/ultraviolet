import { Tooltip } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Tooltip,
  title: 'UI/Overlay/Tooltip',
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
} as Meta

export { Playground } from './Playground.stories'
export { Placement } from './Placement.stories'
export { MaxWidth } from './MaxWidth.stories'
export { PlacementAuto } from './PlacementAuto.stories'
