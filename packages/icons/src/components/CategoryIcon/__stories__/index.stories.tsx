import type { Meta } from '@storybook/react-vite'
import { BaremetalCategoryIcon } from '../__generated__'
import Documentation from './Documentation.md?raw'

export default {
  component: BaremetalCategoryIcon,
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
  title: 'Icons/CategoryIcon',
} as Meta

export { List } from './List.stories'
export { Playground } from './Playground.stories'
