import type { Meta } from '@storybook/react'
import { ProductIcon } from '..'
import Documentation from './Documentation.md'

export default {
  component: ProductIcon,
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
export { Sizes } from './Sizes.stories'
export { List } from './List.stories'
