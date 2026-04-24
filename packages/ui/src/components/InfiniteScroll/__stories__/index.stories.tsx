import { InfiniteScroll } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: InfiniteScroll,
  title: 'UI/Data Display/InfiniteScroll',
  parameters: {
    a11y: 'partial',
  },
} as Meta

export { Playground } from './Playground.stories'
export { SelectInput } from './SelectInput.stories'
export { Table } from './Table.stories'
