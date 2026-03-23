import { BaremetalCategoryIcon } from '../__generated__'

import Documentation from './Documentation.md?raw'

import type { Meta } from '@storybook/react-vite'

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
