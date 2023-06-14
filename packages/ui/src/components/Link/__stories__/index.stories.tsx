import type { Meta } from '@storybook/react'
import { Link } from '..'

export default {
  component: Link,
  parameters: {
    docs: {
      description: {
        component:
          'Link is a component used to navigate between pages or to external websites.',
      },
    },
  },
  title: 'Components/Action/Link',
} as Meta

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Target } from './Target.stories'
export { Size } from './Size.stories'
export { OneLine } from './OneLine.stories'
export { Prominence } from './Prominence.stories'
