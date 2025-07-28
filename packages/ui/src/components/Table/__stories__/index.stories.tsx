import type { Meta } from '@storybook/react-vite'
import { Table } from '..'

export default {
  component: Table,
  subcomponents: { 'Table.Cell': Table.Cell, 'Table.Row': Table.Row },
  title: 'Components/Data Display/Table',
} as Meta

export { Align } from './Align.stories'
export { ColumnInfo } from './ColumnInfo.stories'
export { ColumnWidth } from './ColumnWidth.stories'
export { Context } from './Context.stories'
export { Expandable } from './Expandable.stories'
export { HighlightAnimation } from './HighlightAnimation.stories'
export { Loading } from './Loading.stories'
export { Ordering } from './Ordering.stories'
export { Overflow } from './Overflow.stories'
export { Playground } from './Playground.stories'
export { Selectable } from './Selectable.stories'
export { SelectableColumn } from './SelectableColumn.stories'
export { Spanning } from './Spanning.stories'
export { Style } from './Style.stories'
export { WithMenu } from './WithMenu.stories'
