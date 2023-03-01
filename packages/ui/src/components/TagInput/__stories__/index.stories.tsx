import type { Meta } from '@storybook/react'
import { TagInput } from '..'

export default {
  component: TagInput,
  parameters: {
    docs: {
      description: {
        component: 'Text input with multiple tag component in a row.',
      },
    },
    experimental: true,
  },
  title: 'Components/Data Entry/TagInput',
} as Meta

export { Playground } from './Playground.stories'
