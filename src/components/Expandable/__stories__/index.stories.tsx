import type { Meta } from '@storybook/react'
import Expandable from '..'

export default {
  component: Expandable,
  parameters: {
    docs: {
      description: {
        component:
          'An Expandable is a container that can hide or show its content',
      },
    },
  },
  title: 'Components/Expandable',
} as Meta

export { Playground } from './Playground.stories'
export { Controlled } from './Controlled.stories'
