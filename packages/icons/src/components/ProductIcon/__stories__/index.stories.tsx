import type { Meta } from '@storybook/react-vite'
import { ConsoleProductIcon } from '../__generated__'
import Documentation from './Documentation.md?raw'

export default {
  component: ConsoleProductIcon,
  title: 'Icons/ProductIcon',
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
} as Meta

export { Disabled } from './Disabled.stories'
export { List } from './List.stories'
export { Playground } from './Playground.stories'
export { Sizes } from './Sizes.stories'
export { Variants } from './Variants.stories'
