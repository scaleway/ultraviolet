import type { Meta } from '@storybook/react'
import { BaremetalCategoryIcon } from '..'
import Documentation from './Documentation.md?raw'

export default {
  component: BaremetalCategoryIcon,
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
