import type { Meta } from '@storybook/react'
import { Icon } from '..'
import Documentation from './Documentation.md?raw'

export default {
  component: Icon,
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
export { UnknownOrUndefined } from './UnknownOrUndefined.stories'
