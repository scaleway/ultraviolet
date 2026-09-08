import type { Meta } from '@storybook/react-vite'
import { Card } from '..'

export default {
  component: Card,
  title: 'UI/Layout/Card',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
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
