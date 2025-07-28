import type { Meta } from '@storybook/react-vite'
import { Breadcrumbs } from '..'
import { Item } from '../components/Item'

export default {
  component: Breadcrumbs,
  subcomponents: { 'Breadcrumbs.Item': Item },
  title: 'Components/Navigation/Breadcrumbs',
} as Meta

export { AdvancedUsage } from './AdvancedUsage.stories'
export { Interactive } from './Interactive.stories'
export { OnClick } from './OnClick.stories'
export { Playground } from './Playground.stories'
export { Responsive } from './Responsive.stories'
