import type { Meta } from '@storybook/react'
import { Table } from '..'

export default {
  component: Table,
  title: 'Components/Data Display/Table',
  subcomponents: { Row: Table.Row, Cell: Table.Cell },
} as Meta

export { Playground } from './Playground.stories'
export { Ordering } from './Ordering.stories'
export { Selectable } from './Selectable.stories'
export { Style } from './Style.stories'
export { ColumnWidth } from './ColumnWidth.stories'
export { Spanning } from './Spanning.stories'
export { Loading } from './Loading.stories'
export { ColumnInfo } from './ColumnInfo.stories'
export { Context } from './Context.stories'
