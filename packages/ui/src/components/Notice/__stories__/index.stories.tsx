import type { ComponentMeta } from '@storybook/react'
import Notice from '..'

export default {
  component: Notice,
  parameters: {
    docs: {
      description: {
        component: `Notice can be useful for small info messsages`,
      },
    },
  },
  title: 'Components/Feedback/Notice',
} as ComponentMeta<typeof Notice>

export { Playground } from './Playground.stories'
