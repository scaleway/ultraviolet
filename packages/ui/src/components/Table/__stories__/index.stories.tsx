import type { Meta } from '@storybook/react'
import { Body, BodyCell, Head, HeadCell, Row, Table } from '..'

export default {
  component: Table,
  parameters: {
    docs: {
      description: {
        component:
          'A visual element that presents data in a structured format with rows and columns, commonly used for displaying tabular information.',
      },
    },
  },
  subcomponents: { Body, BodyCell, Head, HeadCell, Row },
  title: 'Components/Data Display/Table',
} as Meta

export { Playground } from './Playground.stories'
export { Hoverable } from './Hoverable.stories'
export { Loader } from './Loader.stories'
export { ColumnWidth } from './ColumnWidth'
export { Striped } from './Striped.stories'
