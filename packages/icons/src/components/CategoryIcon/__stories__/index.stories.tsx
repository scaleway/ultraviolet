import type { Meta } from '@storybook/react'
import { CategoryIcon } from '..'
import Documentation from './Documentation.md'

export default {
  component: CategoryIcon,
  title: 'Icons/CategoryIcon',
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { List } from './List.stories'
