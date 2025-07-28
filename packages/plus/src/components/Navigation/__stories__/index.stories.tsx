import type { Meta } from '@storybook/react-vite'
import { Navigation, NavigationProvider } from '..'

export default {
  component: Navigation,
  subcomponents: {
    'Navigation.Group': Navigation.Group,
    'Navigation.Item': Navigation.Item,
    'Navigation.PinnedItems': Navigation.PinnedItems,
    'Navigation.Separator': Navigation.Separator,
    NavigationProvider,
  },
  title: 'Plus/Compositions/Navigation',
} as Meta

export { Playground } from './Playground.stories'
