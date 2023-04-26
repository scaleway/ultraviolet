import type { Meta } from '@storybook/react'
import { Breadcrumbs, Item } from '..'

export default {
  component: Breadcrumbs,
  subcomponents: { Item },
  title: 'Components/Navigation/Breadcrumbs',
} as Meta

export { Playground } from './Playground'
export { Selected } from './Selected'
export { To } from './To'
export { OnClick } from './OnClick'
