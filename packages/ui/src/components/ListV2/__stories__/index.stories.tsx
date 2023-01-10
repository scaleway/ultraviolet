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
    'List.Cell': List.Cell,
  },
} as ComponentMeta<typeof List>

export { Playground } from './Playground.stories'
export { Sortable } from './Sortable.stories'
export { Selectable } from './Selectable.stories'
export { RowExpandable } from './RowExpandable.stories'
export { RowExpandableAutoclose } from './RowExpandableAutoclose.stories'
export { RowExpandableWithAction } from './RowExpandableWithAction.stories'
export { ControlledRowExpandable } from './ControlledRowExpandable.stories'
export { Sentiments } from './Sentiments.stories'
export { Loading } from './Loading.stories'
