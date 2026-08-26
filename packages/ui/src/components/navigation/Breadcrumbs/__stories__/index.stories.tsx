import type { Meta } from '@storybook/react-vite'
import { Breadcrumbs } from '..'
import { Item } from '../components/Item'

export default {
  component: Breadcrumbs,
  subcomponents: { 'Breadcrumbs.Item': Item },
  title: 'UI/Navigation/Breadcrumbs',
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
export { Responsive } from './Responsive.stories'
export { OnClick } from './OnClick.stories'
export { Interactive } from './Interactive.stories'
export { AdvancedUsage } from './AdvancedUsage.stories'
