import type { Meta } from '@storybook/react-vite'
import { InfiniteScroll } from '..'

export default {
  component: InfiniteScroll,
  title: 'UI/Data Display/InfiniteScroll',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { SelectInput } from './SelectInput.stories'
export { Table } from './Table.stories'
