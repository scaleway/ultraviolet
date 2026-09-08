import type { Meta } from '@storybook/react-vite'
import { Drawer } from '..'

export default {
  component: Drawer,
  title: 'UI/Overlay/Drawer',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta<typeof Drawer>

export { Playground } from './Playground.stories'
export { Size } from './Size.stories'
export { Footer } from './Footer.stories'
export { FunctionProps } from './FunctionProps.stories'
export { NoPadding } from './NoPadding.stories'
export { Push } from './Push.stories'
