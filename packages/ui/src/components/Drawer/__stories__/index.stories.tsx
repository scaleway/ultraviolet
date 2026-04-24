import { Drawer } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Drawer,
  title: 'UI/Overlay/Drawer',
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
} as Meta<typeof Drawer>

export { Playground } from './Playground.stories'
export { Size } from './Size.stories'
export { Footer } from './Footer.stories'
export { FunctionProps } from './FunctionProps.stories'
export { NoPadding } from './NoPadding.stories'
export { Push } from './Push.stories'
