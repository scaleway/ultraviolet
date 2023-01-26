import type { Meta } from '@storybook/react'
import { TagList } from '..'

export default {
  component: TagList,
  parameters: {
    docs: {
      description: {
        component:
          'List of tags mixed with tooltip tags depending on configuration limit.',
      },
    },
  },
  title: 'Components/Data Display/TagList',
} as Meta

export { Playground } from './Playground.stories'
export { Threshold } from './Threshold.stories'
export { Multiline } from './Multiline.stories'
