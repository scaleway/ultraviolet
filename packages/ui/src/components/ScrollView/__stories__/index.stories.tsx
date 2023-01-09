import type { ComponentMeta } from '@storybook/react'
import ScrollView from '..'

export default {
  component: ScrollView,
  parameters: {
    docs: {
      description: {
        component:
          'ScrollView is a component that will add a scroll bar on the left when text overpass the defined height.',
      },
    },
  },
  title: 'Components/Navigation/ScrollView',
} as ComponentMeta<typeof ScrollView>

export { Playground } from './Playground.stories'
