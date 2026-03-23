import { Navigation, NavigationProvider } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Navigation,
  title: 'Plus/Compositions/Navigation',
  subcomponents: {
    NavigationProvider,
    'Navigation.Group': Navigation.Group,
    'Navigation.Item': Navigation.Item,
    'Navigation.PinnedItems': Navigation.PinnedItems,
    'Navigation.Separator': Navigation.Separator,
    'Navigation.ShowHide': Navigation.ShowHide,
  },
  tags: ['deprecated'],
  parameters: {
    docs: {
      description: {
        component:
          'This component is deprecated, please import it from `@ultraviolet/ui/compositions/Navigation` instead. [Click here to see the full documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/compositions-navigation--docs).',
      },
    },
  },
} satisfies Meta

export { Playground } from './Playground.stories'
export { ShowHide } from './ShowHide.stories'
