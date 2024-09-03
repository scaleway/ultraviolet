import type { Meta } from '@storybook/react'
import { Baremetal } from '..'
import Documentation from './Documentation.md?raw'

export default {
  component: Baremetal,
  title: 'Icons/CategoryIcon',
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { List } from './List.stories'
