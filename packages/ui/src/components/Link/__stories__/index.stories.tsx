import type { Meta } from '@storybook/react-vite'
import { Link } from '..'

export default {
  component: Link,
  title: 'UI/Action/Link',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Sentiment } from './Sentiment.stories'
export { Icons } from './Icons.stories'
export { Target } from './Target.stories'
export { Size } from './Size.stories'
export { OneLine } from './OneLine.stories'
export { Prominence } from './Prominence.stories'
export { Examples } from './Examples.stories'
export { Render } from './Render.stories'
