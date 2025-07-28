import type { Meta } from '@storybook/react-vite'
import { InfoTable } from '..'

export default {
  component: InfoTable,
  subcomponents: {
    InfoTable,
    'InfoTable.Cell': InfoTable.Cell,
    'InfoTable.Row': InfoTable.Row,
  },
  title: 'Plus/Compositions/InfoTable',
} satisfies Meta

export { ComplexExample } from './ComplexExample.stories'
export { MultiLine } from './MultiLine.stories'
export { Playground } from './Playground.stories'
