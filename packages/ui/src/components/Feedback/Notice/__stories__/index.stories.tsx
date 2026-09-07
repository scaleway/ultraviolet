import type { Meta } from '@storybook/react-vite'
import { Notice } from '..'

export default {
  component: Notice,
  title: 'UI/Feedback/Notice',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta<typeof Notice>

export { Playground } from './Playground.stories'
export { ComplexChildren } from './ComplexChildren.stories'
