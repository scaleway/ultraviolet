import type { Meta } from '@storybook/react'
import Link from '..'

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
  title: 'Components/Button/Link',
} as Meta

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
export { Target } from './Target.stories'
export { Size } from './Size.stories'
