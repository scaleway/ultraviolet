import type { Meta } from '@storybook/react'
import { TableV2 } from '..'

export default {
  component: TableV2,
  parameters: {
    docs: {
      description: {
        component: 'TableV2 represents tabular data.',
      },
    },
  },
  title: 'Components/Data Display/TableV2',
  subcomponents: { Row: TableV2.Row, Cell: TableV2.Cell },
} as Meta

export { Playground } from './Playground.stories'
export { Ordering } from './Ordering.stories'
export { Selectable } from './Selectable.stories'
export { Style } from './Style.stories'
export { ColumnWidth } from './ColumnWidth.stories'
export { Spanning } from './Spanning.stories'
export { Loading } from './Loading.stories'
export { Context } from './Context.stories'
