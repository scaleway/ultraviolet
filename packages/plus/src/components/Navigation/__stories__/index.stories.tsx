import type { Meta } from '@storybook/react'
import { Navigation } from '..'

export default {
  component: Navigation,
  title: 'Plus/Compositions/Navigation',
  subcomponents: {
    'Navigation.Group': Navigation.Group,
    'Navigation.Item': Navigation.Item,
    'Navigation.PinnedItems': Navigation.PinnedItems,
    'Navigation.Separator': Navigation.Separator,
  },
} as Meta

export { Playground } from './Playground.stories'
