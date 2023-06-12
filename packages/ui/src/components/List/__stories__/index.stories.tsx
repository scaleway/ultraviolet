import type { Meta } from '@storybook/react'
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
  title: 'Components/Data Display/List',
  subcomponents: {
    'List.Row': List.Row,
    'List.Cell': List.Cell,
  },
} as Meta<typeof List>

export { Playground } from './Playground.stories'
export { Loading } from './Loading.stories'
export { Expandable } from './Expandable.stories'
export { ExpandableAutocollapse } from './ExpandableAutocollapse.stories'
export { PreventClick } from './PreventClick.stories'
export { Selectable } from './Selectable.stories'
export { Sentiments } from './Sentiment.stories'
export { Columns } from './Columns.stories'
export { Ordering } from './Ordering.stories'
export { TooltipInfo } from './TooltipInfo.stories'
export { Context } from './Context.stories'
export { Example } from './Example.stories'
