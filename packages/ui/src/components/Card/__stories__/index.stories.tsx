import { Card } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Card,
  title: 'UI/Layout/Card',
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
export { Header } from './Header.stories'
export { SubHeader } from './SubHeader.stories'
export { AdvancedHeader } from './AdvancedHeader.stories'
export { Active } from './Active.stories'
export { Disabled } from './Disabled.stories'
export { Layout } from './Layout.stories'
