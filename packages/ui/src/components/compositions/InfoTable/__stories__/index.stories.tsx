import type { Meta } from '@storybook/react-vite'
import { InfoTable } from '..'

export default {
  component: InfoTable,
  title: 'Compositions/InfoTable',
  subcomponents: {
    InfoTable,
    'InfoTable.Row': InfoTable.Row,
    'InfoTable.Cell': InfoTable.Cell,
  },
} satisfies Meta

export { Playground } from './Playground.stories'
export { MultiLine } from './MultiLine.stories'
export { ComplexExample } from './ComplexExample.stories'
