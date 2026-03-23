import { FranceFlag } from '../__generated__'

import Documentation from './Documentation.md?raw'

import type { Meta } from '@storybook/react-vite'

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
export { Disabled } from './Disabled.stories'
export { List } from './List.stories'
