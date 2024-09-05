import type { Meta } from '@storybook/react'
import { Console } from '..'
import Documentation from './Documentation.md?raw'

export default {
  component: Console,
  title: 'Icons/ProductIcon',
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
export { Disabled } from './Disabled.stories'
export { Sizes } from './Sizes.stories'
export { List } from './List.stories'
