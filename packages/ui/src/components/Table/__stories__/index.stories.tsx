import type { Meta } from '@storybook/react'
import { Table } from '..'

export default {
  component: Table,
  title: 'Components/Data Display/Table',
  subcomponents: { 'Table.Row': Table.Row, 'Table.Cell': Table.Cell },
} as Meta

export { Playground } from './Playground.stories'
export { Ordering } from './Ordering.stories'
export { Selectable } from './Selectable.stories'
export { Expandable } from './Expandable.stories'
export { Style } from './Style.stories'
export { ColumnWidth } from './ColumnWidth.stories'
export { Align } from './Align.stories'
export { Spanning } from './Spanning.stories'
export { Loading } from './Loading.stories'
export { ColumnInfo } from './ColumnInfo.stories'
export { Context } from './Context.stories'
export { WithMenu } from './WithMenu.stories'
export { HighlightAnimation } from './HighlightAnimation.stories'
export { SelectableColumn } from './SelectableColumn.stories'
