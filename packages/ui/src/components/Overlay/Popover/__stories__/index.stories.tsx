import type { Meta } from '@storybook/react-vite'
import { Popover } from '..'

export default {
  component: Popover,
  title: 'UI/Overlay/Popover',
  parameters: {
    a11yStatus: {
      perceivable: true,
      operable: true,
      understandable: true,
      robust: true,
    },
  },
} as Meta<typeof Popover>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Sizes } from './Sizes.stories'
export { AdvancedUsage } from './AdvancedUsage.stories'
export { PlacementAuto } from './PlacementAuto.stories'
export { Controlled } from './Controlled.stories'
