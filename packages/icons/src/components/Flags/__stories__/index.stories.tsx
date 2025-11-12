import type { Meta } from '@storybook/react-vite'
import { FranceFlag } from '../__generated__'
import Documentation from './Documentation.md?raw'

export default {
  component: FranceFlag,
  title: 'Icons/Flags',
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Sizes } from './Sizes.stories'
export { List } from './List.stories'
