import { Popover } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Popover,
  title: 'UI/Overlay/Popover',
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
} as Meta<typeof Popover>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Sizes } from './Sizes.stories'
export { AdvancedUsage } from './AdvancedUsage.stories'
export { PlacementAuto } from './PlacementAuto.stories'
