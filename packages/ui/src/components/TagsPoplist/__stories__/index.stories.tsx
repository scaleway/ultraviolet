import type { Meta } from '@storybook/react'
import { TagsPoplist } from '..'

export default {
  component: TagsPoplist,
  parameters: {
    docs: {
      description: {
        component:
          'List of tags mixed with tooltip tags depending on configuration limit.',
      },
    },
  },
  title: 'Components/Data Display/TagsPopList',
} as Meta

export { Playground } from './Playground.stories'
export { Threshold } from './Threshold.stories'
export { Multiline } from './Multiline.stories'
