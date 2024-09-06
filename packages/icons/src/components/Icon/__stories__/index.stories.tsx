import type { Meta } from '@storybook/react'
import { AddressIcon } from '..'
import Documentation from './Documentation.md?raw'

export default {
  component: AddressIcon,
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
