import type { Meta } from '@storybook/react'
import { Breadcrumbs } from '..'
import { Item } from '../components/Item'

export default {
  component: Breadcrumbs,
  subcomponents: { 'Breadcrumbs.Item': Item },
  title: 'Components/Navigation/Breadcrumbs',
} as Meta

export { Playground } from './Playground.stories'
export { OnClick } from './OnClick.stories'
export { Interactive } from './Interactive.stories'
export { AdvancedUsage } from './AdvancedUsage.stories'
