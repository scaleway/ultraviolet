import type { Meta } from '@storybook/react'
import { Address } from '..'
import Documentation from './Documentation.md?raw'

export default {
  component: Address,
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
  title: 'Icons/Icon',
} as Meta

export { Playground } from './Playground.stories'
export { Name } from './Name.stories'
export { Size } from './Size.stories'
export { Sentiment } from './Sentiment.stories'
