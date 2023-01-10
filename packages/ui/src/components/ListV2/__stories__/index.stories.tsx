import type { ComponentMeta } from '@storybook/react'
import { List } from '..'

export default {
  component: List,
  parameters: {
    docs: {
      description: {
        component: 'Display a list of your data.',
      },
    },
  },
  title: 'Components/Data Display/ListV2',
  subcomponents: {
    'List.Row': List.Row,
    'List.Expandable': List.Expandable,
    'List.Body': List.Body,
    'List.Cell': List.Cell,
    'List.Headers': List.Headers,
    'List.HeaderRow': List.HeaderRow,
    'List.Header': List.Header,
    'List.Placeholder': List.Placeholder,
  },
} as ComponentMeta<typeof List>

export { Playground } from './Playground.stories'
export { Sortable } from './Sortable.stories'
export { Selectable } from './Selectable.stories'
export { RowExpandable } from './RowExpandable.stories'
export { RowExpandableAutoclose } from './RowExpandableAutoclose.stories'
export { ControlledRowExpandable } from './ControlledRowExpandable.stories'
export { Variants } from './Variants.stories'
export { Loading } from './Loading.stories'
export { Perf } from './Perf.stories'
