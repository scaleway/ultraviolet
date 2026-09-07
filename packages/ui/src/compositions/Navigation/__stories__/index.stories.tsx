import type { Meta } from '@storybook/react-vite'
import { Navigation, NavigationProvider } from '..'

export default {
  component: Navigation,
  title: 'Compositions/Navigation',
  subcomponents: {
    NavigationProvider,
    'Navigation.Group': Navigation.Group,
    'Navigation.Item': Navigation.Item,
    'Navigation.PinnedItems': Navigation.PinnedItems,
    'Navigation.Separator': Navigation.Separator,
    'Navigation.ShowHide': Navigation.ShowHide,
  },
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
    experimental: true,
    layout: 'fullscreen',
  },
} as Meta

export { Playground } from './Playground.stories'
export { ShowHide } from './ShowHide.stories'
