import type { Meta } from '@storybook/react-vite'
import { Drawer } from '..'

export default {
  component: Drawer,
  title: 'Components/Overlay/Drawer',
} as Meta<typeof Drawer>

export { Playground } from './Playground.stories'
export { Size } from './Size.stories'
export { Footer } from './Footer.stories'
export { FunctionProps } from './FunctionProps.stories'
export { NoPadding } from './NoPadding.stories'
export { Push } from './Push.stories'
