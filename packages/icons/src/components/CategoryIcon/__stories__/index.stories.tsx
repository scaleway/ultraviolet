import type { Meta } from '@storybook/react-vite'
import { BaremetalCategoryIcon } from '../__generated__'
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

export { List } from './List.stories'
export { Playground } from './Playground.stories'
