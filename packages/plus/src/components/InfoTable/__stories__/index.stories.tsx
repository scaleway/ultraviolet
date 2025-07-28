import type { Meta } from '@storybook/react-vite'
import { InfoTable } from '..'

export default {
  component: InfoTable,
  title: 'Plus/Compositions/InfoTable',
  subcomponents: {
    InfoTable,
    'InfoTable.Row': InfoTable.Row,
    'InfoTable.Cell': InfoTable.Cell,
  },
} satisfies Meta

export { ComplexExample } from './ComplexExample.stories'
export { MultiLine } from './MultiLine.stories'
export { Playground } from './Playground.stories'
