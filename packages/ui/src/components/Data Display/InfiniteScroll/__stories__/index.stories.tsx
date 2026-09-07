import type { Meta } from '@storybook/react-vite'
import { InfiniteScroll } from '..'

export default {
  component: InfiniteScroll,
  title: 'UI/Data Display/InfiniteScroll',
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { SelectInput } from './SelectInput.stories'
export { Table } from './Table.stories'
