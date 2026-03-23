import { Notice } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Notice,
  title: 'Components/Feedback/Notice',
} as Meta<typeof Notice>

export { Playground } from './Playground.stories'
export { ComplexChildren } from './ComplexChildren.stories'
