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

export { Playground } from './Playground'
export { Loading } from './Loading'
export { Expandable } from './Expandable'
export { ExpandableAutocollapse } from './ExpandableAutocollapse'
export { PreventClick } from './PreventClick'
export { Selectable } from './Selectable'
export { Sentiments } from './Sentiment'
export { Columns } from './Columns'
export { Ordering } from './Ordering'
export { Context } from './Context'
export { Example } from './Example'
