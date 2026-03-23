import { Breadcrumbs } from '..'
import { Item } from '../components/Item'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Breadcrumbs,
  subcomponents: { 'Breadcrumbs.Item': Item },
  title: 'Components/Navigation/Breadcrumbs',
} as Meta

export { Playground } from './Playground.stories'
export { Responsive } from './Responsive.stories'
export { OnClick } from './OnClick.stories'
export { Interactive } from './Interactive.stories'
export { AdvancedUsage } from './AdvancedUsage.stories'
