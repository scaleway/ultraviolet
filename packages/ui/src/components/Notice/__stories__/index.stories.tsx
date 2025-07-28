import type { Meta } from '@storybook/react-vite'
import { Notice } from '..'

export default {
  component: Notice,
  title: 'Components/Feedback/Notice',
} as Meta<typeof Notice>

export { ComplexChildren } from './ComplexChildren.stories'
export { Playground } from './Playground.stories'
