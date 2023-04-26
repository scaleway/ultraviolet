import type { Meta } from '@storybook/react'
import { Link } from '..'

export default {
  component: Link,
  parameters: {
    docs: {
      description: {
        component:
          'An Expandable is a container that can hide or show its content',
      },
    },
  },
  title: 'Components/Action/Link',
} as Meta

export { Playground } from './Playground'
export { Variants } from './Variants'
export { Target } from './Target'
export { Size } from './Size'
export { OneLine } from './OneLine'
export { Prominence } from './Prominence'
